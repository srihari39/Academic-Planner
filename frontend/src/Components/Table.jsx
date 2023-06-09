import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

const columns = [
  { id: 'ID', label: 'Course ID', minWidth: 100 },
  { id: 'Name', label: 'Course Name', minWidth: 170 },
  { id: 'Grade', label: 'Grade', minWidth: 50 },
];

function createData(info, name) {
  return { 'ID': info["course_id"], 'Name': name, 'Grade': info["course_grade"] ? info["course_grade"] : '' };
}


export default function PaginationTable() {

  const { details, course_details, loading, error } = useSelector((state) => ({
    details: state.studentDetails.details.course_list,
    loading: state.studentDetails.course_details_loading,
    course_details: state.studentDetails.course_details,
    error: state.studentDetails.error,
  }));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const rows = []

  // for (const [key, value] of Object.entries(course_details)) {
  //   rows.push(createData(key, value,))
  // }

  const rows = details.map((course)=>{return createData(course,course_details[course["course_id"]].course_name)});
  // courseInfo.forEach((key, value) => {  })

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ bgcolor: "lightgrey" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

