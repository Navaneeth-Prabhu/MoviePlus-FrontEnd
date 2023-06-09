import React,{useState} from "react"
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
import { CssBaseline, TableHead } from "@mui/material";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";

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
  const {reserveList} = useSelector((state) => state.reserveList);
  console.log(reserveList)
    const [state, setState] = useState([]);
   const [block, setBlock] = useState(false);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reserveList.length) : 0;

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
            <TableCell align="left">UserId</TableCell>
            <TableCell align="left">BookedOn</TableCell>
            <TableCell align="left">Reserve-Date</TableCell>
            <TableCell align="left">Show Time</TableCell>
            <TableCell align="left">No:Seats</TableCell>
            <TableCell align="left">SeatId</TableCell>
            <TableCell align="left">Total</TableCell>
            {/* <TableCell align="left">Status</TableCell> */}
            
           
          </TableRow>
        </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? reserveList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : reserveList
              ).map((data,i) => (
                <TableRow key={i+1}>
                
                  <TableCell component="th" scope="row">
                    {i+1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.userId}
                  </TableCell>
                  <TableCell component="th" scope="row">
                  {data.bookedDate.slice(0,10)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.showDate}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.startAt}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.seats.length}
                  </TableCell>
                  <TableCell  component="th" scope="row">
                    <div className="flex flex-row">
                    {
                      data?.seats?.map((item,i)=>(
                        <div key={i} >
                          <p>/{item.seat}</p>
                        </div>
                      ))
                    }
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.total}
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
