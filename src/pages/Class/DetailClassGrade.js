import React, {
    useEffect,
    Fragment,
    useContext,
    useState,
} from "react";
import { useLocation } from "react-router";
import Input from "@mui/material/Input";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import Alert from '@mui/material/Alert';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { StyledEngineProvider } from '@mui/material/styles';
import { AiFillCheckCircle } from 'react-icons/ai';

import { VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
import { ERROR_CODE } from "../../constants/errorCode";
import { API_URL } from "../../constants/const";

import Loading from "../../components/Loading/Loading";
import { Nav2 } from "../../components/Nav/Nav2";
import { Container } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { result } from "lodash";


const API_URL_GRADE = API_URL + "classroom/grade/";
const API_URL_CLASSROOM = API_URL + "classroom/";

const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        if (value === initialValue) {
            return;
        }
        updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    let result;
    if(id === 'code' || id === 'name' || id === 'total')
        result = <Input value={value} onBlur={onBlur} disabled />
    else
        result = <Input value={value} onChange={onChange} onBlur={onBlur} />;
    return result;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
};

const options = [
    "Download",
    "Upload",
    "Mark as finalize"
];

// Be sure to pass our updateMyData and the skipPageReset option

const DetailClassGrade = () => {
    function Table({ columns, data, updateMyData, skipPageReset }) {
        // For this example, we're using pagination to illustrate how to stop the current page from resetting when our data changes
        // Otherwise, nothing is different here.
        const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
            useTable(
                {
                    columns,
                    data,
                    defaultColumn,
                    // use the skipPageReset option to disable page resetting temporarily
                    autoResetPage: !skipPageReset,
                    // updateMyData isn't part of the API, but anything we put into these options will automatically be available on the instance.
                    // That way we can call this function from our cell renderer!
                    updateMyData,
                },
                usePagination
            );
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const [chosenGradeColumn, setChosenGradeColumn] = useState();
        const [uploadAColumnGradeFile, setUploadAColumnGradeFile] = useState();

        const handleChooseGradeColumn = (event, columnId) => {
            setAnchorEl(event.currentTarget);
            const chosenGrade = gradeStructure.find(gradeStructure => gradeStructure.name === columnId);
            setChosenGradeColumn(chosenGrade);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleUploadAColumnGradeFile = e => {
            if (!e.target.files || e.target.files.length === 0) {
                setUploadAColumnGradeFile(undefined)
                return
            }

            // I've kept this example simple by using the first image instead of multiple
            setUploadAColumnGradeFile(e.target.files[0]);
        }

        useEffect(() => {
            if (!uploadAColumnGradeFile) {
                return
            }

            const objectUrl = URL.createObjectURL(uploadAColumnGradeFile)

            setLoading(true);
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "multipart/form-data",
            }

            const dataArray = new FormData();
            dataArray.append("import-grade-board-file", uploadAColumnGradeFile);
            dataArray.append("gradeIdArray", [chosenGradeColumn.gradeId]);
            axios.post(API_URL_GRADE + 'board/' + id + "/import-grade-board", dataArray, { headers })
                .then(function (response) {
                    if (response.data.status === 0) {
                        setError("Please try again later!")
                    }
                    else if (response.data.status === 1) {
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    setError(error);
                    return error;
                })
            setLoading(false);

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        }, [chosenGradeColumn, uploadAColumnGradeFile])

        const handleChooseMethod = (option) => {
            setAnchorEl(null);
            const postData = {
                gradeIdArray: [chosenGradeColumn.gradeId]
            }
            if (option === 'Download') {
                setLoadingWithoutLoadTable(true);
                axios.post(API_URL_GRADE + 'board/' + id + '/export-grade-board',
                    postData,
                    { headers: headers }
                ).then((response) => {
                    setLoadingWithoutLoadTable(false);
                    const downloadLink = response.data.data;
                    window.open(downloadLink);
                }).catch(error => { setError(error) })
            }
            else if (option === 'Mark as finalize'){
                setLoadingWithoutLoadTable(true);
                const gradeUpdateItem = {
                    "id": chosenGradeColumn.gradeId,
                    "isFinalized": true,
                    "name": chosenGradeColumn.name,
                    "maxPoint": chosenGradeColumn.maxPoint
                }
                axios.post(API_URL_GRADE + 'update', gradeUpdateItem, { headers })
                .then(function (response) {
                    setLoadingWithoutLoadTable(false);
                    if (response.data.status === 1) {
                        let newGradeStructure = gradeStructure;
                        newGradeStructure.forEach(gradeStructure => { if(gradeStructure.id === gradeUpdateItem.id) gradeStructure.isFinalized = true });
                        setGradeStructure(newGradeStructure);
                        setLoadingWithoutLoadTable(false);
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    setError(error);
                    return error
                })
            }
        };
        // Render the UI for your table
        return (
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                    {((column.parent !== undefined) && (column.id !== 'name') && (column.id !== 'code') && (column.id!=='total')) && <span>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls="long-menu"
                                            aria-expanded={open ? "true" : undefined}
                                            aria-haspopup="true"
                                            onClick={(e) => { handleChooseGradeColumn(e, column.id) }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </span>}
                                    {(gradeStructure.filter(element => (element.name === column.id && element.isFinalized)).length > 0) && <AiFillCheckCircle />}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            "aria-labelledby": "long-button"
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: 100 * 4.5,
                                width: "20ch",
                                position: "absolute"
                            }
                        }}
                    >
                        {options.map((option) =>
                            <div key={option}>
                                {(option === 'Upload') &&
                                    <MenuItem
                                        component="label"
                                    >
                                        {option}
                                        <input type="file" hidden onChange={handleUploadAColumnGradeFile} />
                                    </MenuItem>
                                }
                                {(option !== 'Upload') &&
                                    <MenuItem
                                        onClick={() => { handleChooseMethod(option) }}
                                    >
                                        {option}
                                    </MenuItem>
                                }
                            </div>
                        )}
                    </Menu>
                </TableHead>
                <TableBody>
                    {page.map((row, i) => {
                        prepareRow(row);
                        const cell = row.cells.map((cell) => {
                            return (
                                <TableCell {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </TableCell>
                            );
                        });
                        if (row.original.isHaveAccount)
                            return <TableRow {...row.getRowProps()}>{cell}</TableRow>;
                        else if (!row.original.isHaveAccount) {
                            return (
                                <TableRow
                                    {...row.getRowProps()}
                                    style={{ background: "#B4B8B8" }}
                                >
                                    {cell}
                                </TableRow>
                            );
                        }
                    })}
                </TableBody>
            </MaUTable>
        );
    }
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingGradeStructure, setLoadingGradeStructure] = useState(false);
    const [loadingGradeBoard, setLoadingGradeBoard] = useState(false);
    const [loadingWithoutLoadTable, setLoadingWithoutLoadTable] = useState(false);
    const [gradeStructure, setGradeStructure] = useState([]);
    const AuthCtx = useContext(AuthContext);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.GRADE_SPLIT);
    const token = AuthCtx.user.token;
    const [board, setBoard] = useState();

    const [data, setData] = useState([]);
    const [uploadListStudentFile, setUploadListStudentFile] = useState();

    const [maxTotalGrade, setMaxTotalGrade] = useState(0);

    useEffect(() => {
        setLoading(true);
        setLoadingGradeBoard(true);
        setLoadingGradeStructure(true);

        axios
            .get(API_URL_GRADE + id, { headers })
            .then((response) => {
                const responseGradeStructure = response.data.data;
                if (responseGradeStructure) {
                    setLoadingGradeStructure(false);
                    setGradeStructure(
                        responseGradeStructure.map((gradeComponent) => {
                            return {
                                maxPoint: gradeComponent.maxPoint,
                                name: gradeComponent.name,
                                gradeId: gradeComponent.id,
                                isFinalized: gradeComponent.isFinalized
                            };
                        })
                    );
                    let tempMaxTotalGrade = 0;
                    for (let i = 0; i < responseGradeStructure.length; i++)
                        tempMaxTotalGrade += responseGradeStructure[i].maxPoint;
                    setMaxTotalGrade(tempMaxTotalGrade)
                }
            })
            .then(() => {
                axios
                    .get(
                        API_URL_GRADE + "board/" + id,
                        { headers: headers }
                    )
                    .then(function (response) {
                        setLoadingGradeBoard(false);
                        const responseBoard = response.data.data;
                        setData(
                            responseBoard.map((student) => {
                                let gradeNameAndGradeArrayObject = {};
                                gradeNameAndGradeArrayObject = student.gradeArray.map((grade) => {
                                    const gradeName = grade.name;
                                    return { [gradeName]: grade.point };
                                });

                                let gradeNameAndGradeArray = {};

                                for (let i = 0; i < gradeNameAndGradeArrayObject.length; i++)
                                    gradeNameAndGradeArray = Object.assign(
                                        gradeNameAndGradeArray,
                                        gradeNameAndGradeArrayObject[i]
                                    );

                                const row = {
                                    ...gradeNameAndGradeArray,
                                    code: student.studentCode,
                                    name: student.studentName,
                                    subRows: 0,
                                    isHaveAccount: student.name ? true : false,
                                    total: student.totalGrade
                                };

                                return row;
                            })
                        );
                        setBoard(response.data.data.map((element) => {
                            return element;
                        }));
                    })
                    .catch((err) => {
                        setError(ERROR_CODE[err] || "Error!");
                    });
                setLoading(false);
            });
    }, [id, token]);

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "Code",
                        accessor: "code",
                    },
                    {
                        Header: "Name",
                        accessor: "name",
                    },
                ],
            },
            {
                Header: "Grade",
                columns: [{
                    Header: 'Total (Max: ' + maxTotalGrade + ' )',
                    accessor: 'total'
                }].concat(
                    gradeStructure.map((gradeStructure) => {
                        return {
                            Header: () => {
                                return <span>
                                    {gradeStructure.name} (Max: {gradeStructure.maxPoint})
                                </span>
                            },
                            accessor: gradeStructure.name,
                        };
                    })
                )
            },
        ],
        [gradeStructure, maxTotalGrade]
    );

    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setLoading(true);
        setSkipPageReset(true);

        const studentId = board[rowIndex].studentId;
        const gradeId = board[rowIndex].gradeArray.find(element => element.name === columnId).id;
        const point = parseInt(value);

        const postData = {
            studentId,
            gradeId,
            point
        }

        axios.post(API_URL_GRADE + id, postData, { headers })
            .then(function (response) {
                if (response.data.status === 0) {
                    setError("Occur error! Please try again later!")
                }
                else if (response.data.status === 1) {
                    setData((old) =>
                        old.map((row, index) => {
                            if (index === rowIndex) {
                                return {
                                    ...old[rowIndex],
                                    [columnId]: value,
                                };
                            }
                            return row;
                        })
                    );
                }
                setLoading(false);
            })
    };

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    const downloadStudentList = () => {
        axios
            .get(
                API_URL_CLASSROOM + id + "/export-student",
                { headers: headers }
            ).then((response) => {
                const downloadLink = response.data.data;
                window.open(downloadLink);
            })
    }

    const handleUploadStudentListFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setUploadListStudentFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setUploadListStudentFile(e.target.files[0]);
    }

    useEffect(() => {
        if (!uploadListStudentFile) {
            return
        }

        const objectUrl = URL.createObjectURL(uploadListStudentFile)

        setLoading(true);
        const headers = {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
        }

        const dataArray = new FormData();
        dataArray.append("import-student-file", uploadListStudentFile);
        axios.post(API_URL_CLASSROOM + id + "/import-student", dataArray, { headers })
            .then(function (response) {
                if (response.data.status === 0) {
                    setError("Please check your permission and try again later!")
                }
                else if (response.data.status === 1) {
                    window.location.reload();
                }
            })
            .catch(function (error) {
                setError(error);
                return error;
            })
        setLoading(false);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [id, location, uploadListStudentFile])

    const downloadBoard = () => {
        const gradeIdArray = gradeStructure.map(structure => structure.gradeId);
        const postData = {
            gradeIdArray: gradeIdArray
        }
            setLoadingWithoutLoadTable(true);
            axios.post(API_URL_GRADE + 'board/' + id + '/export-grade-board',
                postData,
                { headers: headers }
            ).then((response) => {
                setLoadingWithoutLoadTable(false);
                const downloadLink = response.data.data;
                window.open(downloadLink);
            }).catch(error => { setError(error) })
    }
    return (
        <StyledEngineProvider injectFirst>
            <Fragment>
                <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
                {(loading || loadingGradeBoard || loadingGradeStructure) && <Loading />}
                {loadingWithoutLoadTable && <Loading />}
                {error && <Alert severity="error">{error}</Alert>}
                {!loading && !error &&
                    <div>
                    <Box sx={{ p: 2, pr: 10, display: "flex", flexDirection: "row-reverse" }}>
                        <Button variant="outlined" onClick={downloadStudentList}>Download Student List</Button>
                        <Button variant="outlined" component="label" sx={{ mr: 2 }}> Upload Student List <input type="file" hidden onChange={handleUploadStudentListFile} /> </Button>
                        <Button variant="outlined" onClick={downloadBoard} sx={{ mr: 2 }}>Export all grade</Button>
                    </Box>
                    </div>
                }
                <Container>
                    {!loading && !error &&
                        <Table
                            columns={columns}
                            data={data}
                            updateMyData={updateMyData}
                            skipPageReset={skipPageReset}
                        />
                    }
                </Container>
            </Fragment>
        </StyledEngineProvider>
    );
};

export default DetailClassGrade;
