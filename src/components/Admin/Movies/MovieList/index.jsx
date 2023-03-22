import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../thems";
import PropTypes from "prop-types";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { AdminInstance, UserInstance } from "../../../../axios/axios";
import { useState } from "react";
import EditMovieModel from "../AddMovies/EditMovieModel";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../../../../redux/actions/movieAction";

function Movies() {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [addModel, setaddModel] = useState(false);
  const [editModel, seteditModel] = useState(false);
  const [movie, setmovie] = useState();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Genre",
      headerName: "Genre",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Duration",
      headerName: "Duration",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "startDate",
      flex: 1,
    },
    {
      field: "director",
      headerName: "Director",
      flex: 1,
    },
  ];
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
  // const Delete = async (data) => {
  //   dispatch(deleteMovie(data._id));
  // };
  const Delete = async (data) => {
    try {
      dispatch(deleteMovie(data._id));
  
      setData((prevData) => {
        const newData = prevData.filter((movie) => movie._id !== data._id);
        return newData;
      });
    } catch (error) {
      // setError(error.response.data);
    }
  };


  useEffect(() => {
    UserInstance
      .get("/movieInfo")
      .then(({ data }) => {
        setData(data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);

  const handleSave = async(updatedData) => {
    try {
      
      const {data} = await AdminInstance.post(`/editMovie/${movie._id}`, updatedData);
      setData((prevData) => {
        const newData = prevData.map((movie) => {
          if (movie._id === data._id) {
            return data;
          } else {
            return movie;
          }
        });
        return newData;
      });
  
      seteditModel(!editModel);
    } catch (error) {
      // setError(error.response.data);
    }

  };

  function EditMovie(data) {
    // if(data){
    // console.log(data);
    seteditModel(!editModel)
    setmovie(data)

    // }
  }
 

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box m="20px">
        <Button
          variant="contained"
          style={{ float: "right" }}
          onClick={() => {
            navigate("/admin/movies/addMovies");
          }}
        >
          Add Movies
        </Button>
        <Header title="Movies" subtitle="Manage Movies" />
      </Box>

      <CssBaseline>
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="left">Poster</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Language</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="left">Delete</TableCell>
                  {/* <TableCell align="left">Email</TableCell>
            <TableCell align="left">Status</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((item, i) => (
                  <TableRow key={i + 1}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <img className="h-20 w-fit" src={item.PosterImg} alt="" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.Language}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                    {data.city}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.state}
                  </TableCell> */}
                    {/* <TableCell  align="left">
                    {data.email}
                  </TableCell> */}
                    <TableCell align="left">
                      <Button
                        onClick={()=>EditMovie(item)}
                        variant="contained"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => Delete(item)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
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
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={data.length}
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

      <EditMovieModel
        editModel={editModel}
        seteditModel={seteditModel}
        movie={movie}
        handleSave={handleSave}
      />
    </>
  );
}

export default Movies;
