import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { productCategory } from "../Constant/general.constant";
import { useDispatch, useSelector } from "react-redux";
import { clearProductFilter, setProductFilter } from "../store/slices/productSlice";
import { openErrorSnackbar } from "../store/slices/snackBarSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const{category,minPrice, maxPrice ,isFilterApplied}= useSelector((state)=>state.product)

  return (
    <>
      <Formik
        initialValues={{
          category ,
          minPrice ,
          maxPrice ,
        }}
        validationSchema={Yup.object({
          category: Yup.string().trim().oneOf(productCategory),
          minPrice: Yup.number().min(0),
          maxPrice: Yup.number().min(0),
        })}
        onSubmit={(values) => {
          if (values.maxPrice < values.minPrice) {
            dispatch(
              openErrorSnackbar("Max price must be greater than min price.")
            );
          } else {
            dispatch(setProductFilter(values));
          }
        }}
      >
        {({ handleSubmit, touched, errors, getFieldProps }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent:"space-between",
              background: "",
              gap: "1rem",
              flexWrap: "wrap",
              marginRight: "3rem",
            }}
          >
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select label="category" {...getFieldProps("category")}>
                {productCategory?.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
              {touched.category && errors.category ? (
                    <FormHelperText error>{errors.category}</FormHelperText>
                  ) : null}
            </FormControl>
            
            <FormControl>
              <TextField
                size="small"
                label="Min Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                {...getFieldProps("minPrice")}
              />
              {touched.minPrice && errors.minPrice ? (
                <FormHelperText error>{errors.minPrice}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl size="small">
              <TextField
                size="small"
                label="Max Price"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                {...getFieldProps("maxPrice")}
              />
              {touched.maxPrice && errors.maxPrice ? (
                <FormHelperText error>{errors.maxPrice}</FormHelperText>
              ) : null}
            </FormControl>

            
              <Button type="submit" variant="contained">
                Filter
              </Button>
              
            
              {isFilterApplied && <Button variant='contained'color='error' onClick={()=>{
            dispatch(clearProductFilter())
           }} sx={{marginRight: "3rem",}}>Clear Filter</Button>}
          </form>
          
        )}
      </Formik>
    </>
  );
};

export default Filter;
