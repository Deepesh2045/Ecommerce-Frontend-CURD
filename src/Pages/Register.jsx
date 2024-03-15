import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { validationSchema } from "../Validation/ValidationSchema";
import dayjs from "dayjs";
import { useMutation } from "react-query";
import axios from "axios";
import $axios from "../lib/axios.instance";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const minDate = dayjs().startOf("d").subtract(18, "y");
  const navigate = useNavigate();

  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: ["user-register"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (response) => {
      console.log(response);
      navigate("/login");
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
      {isLoading && <LinearProgress color="error" />}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          dob: "",
          gender: null,
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          values.dob = null;
          // values.gender = null
          mutate(values);
        }}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: "flex",
              width: "350px",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "2rem",
              background: "white",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "black", fontWeight: "Bold" }}
            >
              Sign Up
            </Typography>
            {/* For First Name */}
            <FormControl>
              <TextField
                required
                size="small"
                label="First Name"
                {...formik.getFieldProps("firstName")}
              ></TextField>
              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>
            {/* ForLast Name */}
            <FormControl>
              <TextField
                required
                size="small"
                label="Last Name"
                {...formik.getFieldProps("lastName")}
              ></TextField>
              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>
            {/* For Email */}
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

            {/* For password */}
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
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
            </FormControl>
            {/* For Date of Birth */}
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    minDate={minDate}
                    label="Date of Birth"
                    onChange={(event) => {
                      console.log(event);
                      {
                        formik.setFieldValue(
                          "dob",
                          dayjs(event).format("DD/MM/YYYY")
                        );
                      }
                    }}
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>

              {formik.touched.dob && formik.errors.dob ? (
                <FormHelperText error>{formik.errors.dob}</FormHelperText>
              ) : null}
            </FormControl>
            {/* For Gender */}
            <FormControl size="small">
              <InputLabel>Gender</InputLabel>
              <Select label="Gender" {...formik.getFieldProps("gender")}>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender ? (
                <FormHelperText error>{formik.errors.gender}</FormHelperText>
              ) : null}
            </FormControl>
            {/* For Role */}
            <FormControl size="small" required>
              <InputLabel>Role</InputLabel>
              <Select label="Role" {...formik.getFieldProps("role")}>
                <MenuItem value={"buyer"}>Buyer</MenuItem>
                <MenuItem value={"seller"}>Seller</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              ) : null}
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ background: "black" }}
            >
              Register
            </Button>
            <Typography color="primary">
              <Link to="/login">Already register? Login</Link>
            </Typography>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
