import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { productCategory } from "../Constant/general.constant";
import { addProduct } from "../lib/apis";
import axios from "axios";
import Loading from "../Components/Loading";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSuccessSnackbar } from "../store/slices/snackBarSlice";
import Test from "./Test";

const AddProduct = () => {
  const [productImage, setProductImage] = useState([]);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false)

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: addProduct,
    onSuccess: (response) => {
      navigate("/products");
      dispatch(openSuccessSnackbar(response?.data?.message))
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message))
    },
  });
  if(isLoading || imageLoading){
    return <Loading/>
  }
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px",background:"" }}
      >
        
        <Formik
          initialValues={{
            name: "",
            brand: "",
            price: "0",
            quantity: "1",
            category: "",
            freeShipping: false,
            description: "",
            image: null,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required.")
              .trim()
              .max(55, "Name must be at max 55 character."),
            brand: Yup.string()
              .required("Brand is required.")
              .trim()
              .max(55, "Brand must be at max 55 character."),
            price: Yup.number()
              .required("Price is required.")
              .min(0, "Price must be at least 0."),
            quantity: Yup.number()
              .required("Quantity is required.")
              .min(1, "Quantity must be at least 1."),
            category: Yup.string()
              .required("Category is required.")
              .trim()
              .oneOf(productCategory),
            freeShipping: Yup.boolean().default(false),
            description: Yup.string()
              .required("Description is required.")
              .trim()
              .min(500, "Description must be at least 500 character.")
              .max(1000, "Description must be at max 1000 character."),
            image: Yup.string().trim().nullable(),
          })}
          onSubmit={async (values) => {
            let imageUrl;
            if (productImage) {
              const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
              const data = new FormData();
              data.append("file", productImage);
              data.append("upload_preset", uploadPreset);
              data.append("cloud_name", cloudname);
              try {
                setImageLoading(true)
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/upload`,
                  data
                );
                setImageLoading(false)

               
                imageUrl = res?.data?.secure_url

                
              } catch (error) {
                setImageLoading(false)
                console.log("Image upload failed");
              }
            }
            values.image = imageUrl;
            mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, touched, errors }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                width: "350px",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "0rem 2rem 2rem 2rem",
                marginTop: "20px",
                marginBottom: "20px",
                background: "white",
                position: "relative",
              }}
            >
              <Box sx={{}}>
                {" "}
                {isLoading && (
                  <LinearProgress color="primary" sx={{ width: "100%" }} />
                )}
              </Box>

              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: "20px" }}
              >
                Add Product
              </Typography>
              <FormControl>
                <TextField
                  size="small"
                  label="Name"
                  {...getFieldProps("name")}
                ></TextField>
                {touched.name && errors.name ? (
                  <FormHelperText error>{errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  size="small"
                  label="Brand"
                  {...getFieldProps("brand")}
                ></TextField>
                {touched.brand && errors.brand ? (
                  <FormHelperText error>{errors.brand}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  size="small"
                  label="Price"
                  {...getFieldProps("price")}
                ></TextField>
                {touched.price && errors.price ? (
                  <FormHelperText error>{errors.price}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <TextField
                  id="outlined-number"
                  label="Quantity"
                  type="number"
                  size="small"
                  {...getFieldProps("quantity")}
                />
                {touched.quantity && errors.quantity ? (
                  <FormHelperText error>{errors.quantity}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select label="Category" {...getFieldProps("category")}>
                  {productCategory.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                {touched.category && errors.category ? (
                  <FormHelperText error>{errors.category}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl sx={{ textAlign: "start" }}>
                <Typography>
                  Free Shipping{" "}
                  <span>
                    <Checkbox
                      defaultChecked
                      {...getFieldProps("freeShipping")}
                    />
                  </span>
                </Typography>
              </FormControl>

              <FormControl>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  placeholder="Type Your Product Description"
                  {...getFieldProps("description")}
                />

                {touched.description && errors.description ? (
                  <FormHelperText error>{errors.description}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl>
                <input
                  type="file"
                  multiple
                  onChange={(event) => {
                    const file = event?.target?.files[0];
                    setProductImage(file);
                    setLocalUrl(URL.createObjectURL(file));
                  }}
                />
              </FormControl>
              {productImage && <img src={localUrl} />}

              

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ background: "black" }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddProduct;
