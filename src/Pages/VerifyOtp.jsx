import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackBarSlice";
import { useDispatch } from "react-redux";
import Loading from "../Components/Loading";

const VerifyOtp = () => {
const [counter, setCounter]= useState(59)

useEffect(()=>{
    const timer = counter>0 && setInterval(()=>setCounter(counter-1),1000)
    return ()=>{ clearInterval(timer)}
},[counter])


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["otp-verify"],
    mutationFn: async (values) => {
      return await axios.post("http://localhost:8000/otp/verify", {email:localStorage.getItem("email"),otp:values.otp});
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/change-password");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={Yup.object({
          otp: Yup.number().required("Otp is required."),
         
        })}
        onSubmit={(values) => {
        mutate(values)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                background: "",
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack
                gap="1rem"
                sx={{
                  width: "350px",
                  background: "white",
                  padding: "3rem 2rem 3rem 2rem",
                }}
              >
                <Typography
                  variant="h6"
                  color="black"
                  textAlign="start"
                  fontWeight="bold"
                >
                  OTP Verification
                </Typography>
                <Typography
                  variant=""
                  color="black"
                  textAlign="start"
                  fontSize="14px"
                  marginTop="-15px"
                >
                  Please enter the OTP(One-Time Password) send to your
                  registered email to complete your verification
                </Typography>

                <Box sx={{ display: "flex", gap: "1rem"  }} >
                  <FormControl fullWidth className="otp">
                    <TextField
                    size="small"
                      inputProps={{
                        style: {
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "18px", 
                          letterSpacing: "40px",
                        },
                      }}
                      // inputMode="numeric"
                      // pattern="[0-9]"
                      {...formik.getFieldProps("otp")}
                    ></TextField>
                    {formik.touched.otp && formik.errors.otp ? (
                      <FormHelperText error>{formik.errors.otp}</FormHelperText>
                    ) : null}
                 
                  </FormControl>
                </Box>
               
                <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  marginTop="-12px"
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "13px",
                      textAlign: "start",
                      marginTop:"8px"
                    }}
                  >
                    Remaining time:<span style={{ color: "red" }}>{counter}</span>
                  </Typography>
                  <Typography
                    sx={{ color: "black", fontSize: "13px", textAlign: "end" }}
                  >
                    Did not got the code? <Button disabled={counter>0}  sx={{ background:"none" }}>Resend</Button>

                  </Typography>
                 
                </Stack>

                {/* <FormControl>
                  <TextField
                  size="small"
                    label="Email"
                    inputProps={{
                      style: {
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px",
                      },
                    }}
                    {...formik.getFieldProps("email")}
                  ></TextField>
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl> */}

                <Button variant="contained" type="submit" >
                  Verify
                </Button>
                <Button variant="outlined">Cancel</Button>
              </Stack>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default VerifyOtp;
