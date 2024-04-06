import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { QueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackBarSlice";
import { Upload, Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Loading from "../Components/Loading";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async (values) => {
      return await axios.post("http://localhost:8000/user/login", values);
    },
    onSuccess: (response) => {
      // Save token, user role and user name in local storage
      dispatch(openSuccessSnackbar(response?.data?.message));
      localStorage.setItem("token", response?.data?.token);
      localStorage.setItem("userRole", response?.data?.user?.role);
      localStorage.setItem("firstName", response?.data?.user?.firstName);
      localStorage.setItem("lastName", response?.data?.user?.lastName);
      localStorage.setItem("image", response?.data?.user?.image);
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
if(isLoading){
  return <Loading/>
}
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center",  marginTop: "60px",background:""}}
      >
       
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email().required("Email is required.").trim(),
            password: Yup.string().required("Password is required.").trim(),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              style={{
                display: "flex",
                width: "300px",
                flexDirection: "column",
                gap: "1.5rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "3rem 2rem 3rem 2rem",
                background: "#fff",
              }}
              onSubmit={formik.handleSubmit}
            >
              <Box ><img src="../login icon.png" width="80px"/></Box>
              <Typography
                variant="h6"
                textAlign="start"
                sx={{ color: "black", fontWeight: "Bold",marginTop:"-20px" }}
              >
                Sign In
              </Typography>
              {/* // user Name or email */}
              <FormControl sx={{marginTop:"-15px"}}>
                <TextField
                  required
                  size="small"
                  label="Email"
                  {...formik.getFieldProps("email")}
                ></TextField>
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl size="small" required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...formik.getFieldProps("password")}
                  label="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{ background: "#282828" }}
              >
                Login
              </Button>

              <Typography
                color="primary"
                sx={{ textAlign: "end", fontSize: "13px", marginTop: "-18px" }}
              >
                <Link to="/forget-password" style={{ color: "#282828" }}>
                  Forget Password?
                </Link>
              </Typography>

              <Typography color="primary">
                <Link to="/register" style={{ color: "black" }}>
                  New User?{" "}
                  <span style={{ color:"#1976D2" }}>REGISTER</span>
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
