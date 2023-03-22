import React,{useEffect,useState} from "react"
import { AdminInstance } from "../../../axios/axios";
// import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TableHead } from "@mui/material";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from '@mui/material/Button';

import CssBaseline from "@mui/material/CssBaseline";
// import Box from '@mui/material/Box';
import Container from "@mui/material/Container";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function TheaterList() {
    const [state, setState] = useState([]);
const [block, setBlock] = useState(false);
useEffect(() => {
  AdminInstance.get("/theaterList").then((response) => {
    setState(response.data);
  });
}, [block]);

const reject = (id) => {
    AdminInstance.get(`/rejectTheater/${id}`).then(({ data }) => {
       setBlock(!block);
    });
  };

  const approve = (id) => {
    AdminInstance.get(`/approveTheater/${id}`).then(({ data }) => {
      setBlock(!block);
    });
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <CssBaseline>
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
          <TableHead>
          <TableRow>
            <TableCell>index</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Theater</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">State</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Status</TableCell>
            
           
          </TableRow>
        </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? state.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : state
              ).map((data,i) => (
                <TableRow key={i+1}>
                  <TableCell component="th" scope="row">
                    {i+1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.theater}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.address}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.city}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.state}
                  </TableCell>
                  <TableCell  align="left">
                    {data.email}
                  </TableCell>
                  <TableCell  align="left">
                  {data.isApproved == false ? (
                      <Button
                
                        onClick={() => approve(data._id)}
                        variant="contained"
                        color="success"
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button
                        onClick={() => reject(data._id)}
                        variant="outlined"
                        color="error"
                      >
                        Reject
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={state.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </CssBaseline>
  );
}
