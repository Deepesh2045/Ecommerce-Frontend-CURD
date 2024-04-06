import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackBarSlice";
import Loading from "../Components/Loading";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (values) => {
      return await axios.put(
        "http://localhost:8000/otp/change-password",
        values
      );
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      navigate("/login");
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
      <Box
        sx={{
          background: "",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "",email:"" }}
          validationSchema={Yup.object({
            newPassword: Yup.string()
              .required("Password is required")
              .trim()
              .min(6, "Password must be at min 6 character"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("newPassword"), null], "Password must match")
              .required("Password is required")
              .min(6, "Password must be at min 6 character"),
              email: Yup.string()
              .email("Must be a valid Email")
              .required("Email is required"),
          })}
          onSubmit={(values) => {
            mutate(values);
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
                gap: "1.5rem",
              }}
            >
              <Box>
                <img src="../lock.png" alt="" width="80px" />
                <Typography
                  variant="h6"
                  color="black"
                  textAlign="start"
                  marginTop="15px"
                >
                  Change Password
                </Typography>
              </Box>
              <Box
                sx={{
                  color: "black",
                  textAlign: "start",
                  marginTop: "-20px",
                  fontSize: "14px",
                }}
              >
                <Typography variant="">
                  Your New Password Must Be Different from Previously Used
                  Password.
                </Typography>
              </Box>

              <FormControl size="small" required sx={{ marginTop: "" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  New Password
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
                  {...formik.getFieldProps("newPassword")}
                  label="New Password"
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <FormHelperText error>
                    {formik.errors.newPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl size="small" required>
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
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
                  {...formik.getFieldProps("confirmPassword")}
                  label="Confirm Password"
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <FormHelperText error>
                    {formik.errors.confirmPassword}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
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
                </FormControl>

              <Button type="submit" variant="contained">
                Change Password
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ChangePassword;
