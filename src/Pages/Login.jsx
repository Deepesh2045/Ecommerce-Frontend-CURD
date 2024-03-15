import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
const Login = () => {
  const navigate = useNavigate()
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["user-login"],
    mutationFn: async (values) => {
      return await axios.post("http://localhost:8000/user/login", values);
    },
    onSuccess:(response)=>{
      // Save token, user role and user name in local storage
      localStorage.setItem('token', response?.data?.token)
      localStorage.setItem("userRole",response?.data?.user?.role)
      localStorage.setItem("firstName",response?.data?.user?.firstName)
      localStorage.setItem("lastName",response?.data?.user?.lastName)
      navigate("/")
    },
    onError:(error)=>{
      console.log(error?.response?.data?.message)
    }
  });

  return (
    <>
    <Box sx={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
      {isLoading && <LinearProgress color="error"/>}

     <Formik
      initialValues={{
        email:"",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email().required("Email is required.").trim(),
        password: Yup.string().required("Password is required.").trim(),
      })}
      onSubmit={(values) => {
        mutate(values)
      }}
    >
      {(formik) => (
        <form
          style={{
            display: "flex",
            width: "300px",
            flexDirection: "column",
            gap: "8px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "2rem",
            background: "white",
          }}
          onSubmit={formik.handleSubmit}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "black", fontWeight: "Bold" }}
          >
            Sign In
          </Typography>
          {/* // user Name or email */}
          <FormControl>
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

          <FormControl>
            <TextField
              required
              size="small"
              label="Password"
              {...formik.getFieldProps("password")}
            ></TextField>
            {formik.touched.password && formik.errors.password ? (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            ) : null}
          </FormControl>

          <Button type="submit" variant="contained" sx={{background:"black"}}>
            Login
          </Button>
          <Typography color="primary">
            <Link to="/register">New User? Register</Link>
          </Typography>
        </form>
      )}
    </Formik>
    </Box>
    </>
  );
};

export default Login;
