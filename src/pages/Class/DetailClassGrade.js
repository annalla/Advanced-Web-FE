import React, { useEffect, useMemo, Fragment, useContext } from "react";
import { useLocation } from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable } from 'react-table'

import { SRC_IMG, VALUE_TAB } from "../../constants/const";
import { PATH } from "../../constants/paths";
import { getClassById } from "../../apis/class.api";
import AuthContext from "../../store/store";
import { splitPath } from "../../utils/util";
import { JWT_TYPE } from "../../constants/const";
import { ERROR_CODE } from "../../constants/errorCode";

import Loading from "../../components/Loading/Loading";
import { Nav2 } from "../../components/Nav/Nav2";

const dict = {};

const DetailClassGrade = () => {
    const [error, setError] = React.useState(null);
    const [classroom, setClassroom] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const AuthCtx = useContext(AuthContext);
    const location = useLocation();
    const id = splitPath(location.pathname, PATH.GRADE_SPLIT);
    const token = AuthCtx.user.token;

    const information = useMemo(() => {
        if (id in dict) {
            setLoading(true)
            return dict[id];
        }
        return classroom;
    }, [id, classroom]);

    useEffect(() => {
        if (id in dict) {
        } else {
            getClassById(token, id)
                .then((res) => {
                    if (res.status === 1) {
                        const information = {
                            name: res.data.name,
                            code: res.data.code,
                            description: res.data.description,
                            id: res.data.id,
                            isCustom:
                                res.data.jwtType.toString() === JWT_TYPE.JWT_TYPE_TEACHER
                                    ? true
                                    : false,
                            coverImageUrl:
                                res.data.coverImageUrl === ""
                                    ? SRC_IMG.COVER_IMAGE_CLASS
                                    : res.data.coverImageUrl,
                        };
                        setClassroom(information);
                        dict[id] = information;
                    } else {
                        setError(ERROR_CODE[res] || "Get class by id failed!");
                    }
                })
                .catch((err) => {
                    setError(ERROR_CODE[err] || "Get class by id failed!");
                });
        }
    }, [id, token]);

    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
      }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)
      
        const onChange = e => {
          setValue(e.target.value)
        }
      
        // We'll only update the external data when the input is blurred
        const onBlur = () => {
          updateMyData(index, id, value)
        }
      
        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
          setValue(initialValue)
        }, [initialValue])
      
        return <input value={value} onChange={onChange} onBlur={onBlur} />
      }
    const columns = React.useMemo(
        () => [
          {
            Header: "hello",
            columns: [
              {
                Header: 'First Name',
                accessor: 'firstName',
              },
              {
                Header: 'Last Name',
                accessor: 'lastName',
              }
            ]
          }
        ],
        []
      )
    const data = [{firstName: 1, lastName: 2}, {firstName: 1, lastName: 2}]

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })


    return (
        <Fragment>
            {error && <div>Error: {error}</div>}
            {!loading && <Loading />}
            <Nav2 data={information} valueTab={VALUE_TAB.TAB_GRADE} />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <TableRow {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <TableCell {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </MaUTable>
        </Fragment>
    );
};
export default DetailClassGrade;
