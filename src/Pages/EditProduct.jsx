import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { productCategory } from "../Constant/general.constant";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loading from "../Components/Loading";
import axios from "axios";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSuccessSnackbar } from "../store/slices/snackBarSlice";

const EditProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [localUrl, setLocalUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(false)

  const dispatch = useDispatch()

  // Get Edit Product Details
  const { id: productId } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["edit-product-details"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });
  const productDetails = data?.data?.productDetails;
  // Edit Product
  const navigate = useNavigate()
  const{isLoading:editProductLoading,mutate}=useMutation({
    mutationKey: ["edit-product"],
    mutationFn: async (values) => {
      return await $axios.put(`/product/edit/${productId}`, values);
    },
    onSuccess:(res)=>{
navigate(`/product-details/${productId}`)
dispatch(openSuccessSnackbar(res?.data?.message))
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.response?.data?.message))

    }
  });
  if (isLoading || editProductLoading || imageLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "65px" }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: productDetails?.name || "",
            brand: productDetails?.brand || "",
            price: productDetails?.price || "",
            quantity: productDetails?.quantity || "1",
            category: productDetails?.category || "",
            freeShipping: productDetails?.freeShipping || false,
            description: productDetails?.description || "",
            image: productDetails?.image || null,
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
          onSubmit={async(values) => {
            let imageUrl;
            if(productImage){
              const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
              const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
              const data = new FormData()
              data.append("file", productImage)
              data.append("upload_preset", uploadPreset)
              data.append("cloud_name",cloudname)
              try {
                setImageLoading(true)
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
                  data
                );
                setImageLoading(false)
                imageUrl = res?.data?.secure_url                
              } catch (error) {
                setImageLoading(false)
console.log("File upload failed")
                
              }
            }
            values.image = imageUrl
            mutate(values)
          }}
        >
          {({ handleSubmit, getFieldProps, touched, errors, values }) => (
            <form
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
              onSubmit={handleSubmit}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: "20px" }}
              >
                Edit Product
              </Typography>

              {/* For Product Name */}
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
              {/* For Product Brand */}
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
              {/* For Product Price */}
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
              {/* For Product Quantity */}
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
              {/* For Product Category */}
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
              {/* For Product Shipping */}
              <FormControl sx={{ textAlign: "start" }}>
                <Typography>
                  Free Shipping
                  <span>
                    <Checkbox
                      checked={values.freeShipping}
                      {...getFieldProps("freeShipping")}
                    />
                  </span>
                </Typography>
              </FormControl>
              {/* For Product Description */}
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
  <input type="file"
  onChange={(event)=>{
    const file = event?.target?.files[0]
    setProductImage(file)
    setLocalUrl(URL.createObjectURL(file))

  }}
  />
</FormControl>
<Stack> {(localUrl || productDetails?.image) && (<img src={localUrl || productDetails?.image} alt={productDetails.name}/>)}</Stack>
              <Button
                type="submit"
                variant="contained"
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

export default EditProduct;
