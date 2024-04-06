import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSuccessSnackbar } from "../store/slices/snackBarSlice";
import axios from "axios";
import Loading from "../Components/Loading";

const ForgetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const{isLoading,mutate}=useMutation({
    mutationKey:["send-email"],
    mutationFn:async(values)=>{

      localStorage.setItem("email", values.email);
      // return await $axios.post("/otp/send-email",values)
      return await axios.post("http://localhost:8000/otp/send-email", values);

    },
    onSuccess:(res)=>{
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/verify-otp")

    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    }

  })
  if(isLoading){
    return <Loading/>
  }
  return (
    <>
      <Box
        sx={{
          background: "",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Must be a valid Email")
              .required("Email is required"),
          })}
          onSubmit={(values) => {
            mutate(values)
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                width: "300px",
                background: "white",
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                gap: "1rem",
              }}
            >
              <Box>
              <img src="../lock1.png" alt="" width="80px"/>
              </Box>

              <Box>


                <Typography variant="h6" color="black" textAlign="start">
                  Reset Password
                </Typography>
              </Box>
              <Box sx={{color:"black",textAlign:"start",marginTop:"-20px",fontSize:"14px"}}>
                <Typography variant="" >
                  Enter your email address below and we will send you password
                  reset OTP.
                </Typography>
              </Box>

              <FormControl>
                <TextField
                  label="Email Address"
                  {...formik.getFieldProps("email")}
                ></TextField>
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>
              <Button type="submit" variant="contained" >
                Send Email
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ForgetPassword;
