import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../axios/axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useEffect } from "react";

export default function AddStaff() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [values, setvalues] = useState({
    name: "",
    email: "",
    passwrod: "",
  });

  useEffect(() => {
    navigate("/admin/addstaff");
    setState(false);
  }, [state]);

  const generateError = (err) => toast.error(err, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/admin/addstaff",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/admin/addstaff");
          setState(true);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <h2>Add Staff</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="name"
                type={"text"}
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                type={"email"}
                name="email"
                autoComplete="email"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) =>
                  setvalues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="error"
          >
            Add Staff
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
}
