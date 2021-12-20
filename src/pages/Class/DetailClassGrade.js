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
        //console.log("index: ", index);
        //console.log("id: ", id);
        //console.log("value:", value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return <Input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
};

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
    // For this example, we're using pagination to illustrate how to stop
    // the current page from resetting when our data changes
    // Otherwise, nothing is different here.
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
        useTable(
            {
                columns,
                data,
                defaultColumn,
                // use the skipPageReset option to disable page resetting temporarily
                autoResetPage: !skipPageReset,
                // updateMyData isn't part of the API, but
                // anything we put into these options will
                // automatically be available on the instance.
                // That way we can call this function from our
                // cell renderer!
                updateMyData,
            },
            usePagination
        );

    // Render the UI for your table
    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render("Header")}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
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
                                style={{ background: "#808080" }}
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

const DetailClassGrade = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingGradeStructure, setLoadingGradeStructure] = useState(false);
    const [loadingGradeBoard, setLoadingGradeBoard] = useState(false);
    const [gradeStructure, setGradeStructure] = useState([]);
    const AuthCtx = useContext(AuthContext);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.GRADE_SPLIT);
    const token = AuthCtx.user.token;

    const [data, setData] = React.useState([]);

    useEffect(() => {
        setLoading(true);
        setLoadingGradeBoard(true);
        setLoadingGradeStructure(true);

        let listGrade = [];
        axios
            .get(API_URL_GRADE + id, { headers })
            .then((response) => {
                if (response.data.data) {
                    setLoadingGradeStructure(false);
                    setGradeStructure(
                        response.data.data.map((gradeComponent) => {
                            return {
                                maxPoint: gradeComponent.maxPoint,
                                name: gradeComponent.name,
                            };
                        })
                    );
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
                        listGrade = response.data.data;
                        setData(
                            listGrade.map((student) => {
                                let gradeArrayObject = {};
                                gradeArrayObject = student.gradeArray.map((grade) => {
                                    const gradeName = grade.name;
                                    return { [gradeName]: grade.point };
                                });

                                let gradeArray = {};

                                for (let i = 0; i < gradeArrayObject.length; i++)
                                    gradeArray = Object.assign(
                                        gradeArray,
                                        gradeArrayObject[i]
                                    );
                                
                                const row = {
                                    ...gradeArray,
                                    code: student.studentCode,
                                    name: student.studentName,
                                    subRows: 0,
                                    isHaveAccount: student.name ? true : false,
                                };

                                return row;
                            })
                        );
                    });
            })
            .catch((err) => {
                setError(ERROR_CODE[err] || "Error!");
            });
        setLoading(false);
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
                columns: gradeStructure.map((gradeStructure) => {
                    return {
                        Header:
                            gradeStructure.name + " (Max: " + gradeStructure.maxPoint + " )",
                        accessor: gradeStructure.name,
                    };
                }),
            },
        ],
        [gradeStructure]
    );

    const [skipPageReset, setSkipPageReset] = React.useState(false);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);

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
    };

    // After data chagnes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        setSkipPageReset(false);
    }, [data]);

    const downloadStudentList = () => {
        axios
            .get(
                API_URL_CLASSROOM + id + "/export-student",
                { headers: headers }
            ).then((response)=>{
                console.log(response.data.data);
                const downloadLink = response.data.data;
                window.open(downloadLink);
            })
    }

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    return (
        <Fragment>
            {error && <div>Error: {error}</div>}
            <Nav2 id={id} token={token} valueTab={VALUE_TAB.TAB_GRADE} />
            {(loading || loadingGradeBoard || loadingGradeStructure) && <Loading />}
            {!loading &&
                <Box sx={{ p: 2, pr: 10, display: "flex", flexDirection: "row-reverse" }}>
                    <Button variant="outlined" onClick={downloadStudentList}>Download Student List</Button>
                    <Button sx={{ mr: 2 }} variant="outlined">Upload Student List</Button>
                </Box>
            }
            <Container>
                {!loading && (
                    <Table
                        columns={columns}
                        data={data}
                        updateMyData={updateMyData}
                        skipPageReset={skipPageReset}
                    />
                )}
            </Container>
        </Fragment>
    );
};

export default DetailClassGrade;
