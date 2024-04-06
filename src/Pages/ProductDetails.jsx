import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getProductDetails } from "../lib/apis";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import EditIcon from "@mui/icons-material/Edit";
import { fallBackImage } from "../Constant/general.constant";
import DeleteProductDialog from "../Components/DeleteProductDailog";
import $axios from "../lib/axios.instance";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSuccessSnackbar } from "../store/slices/snackBarSlice";

const mainImg =
  "https://jblstore.com.ph/cdn/shop/files/JBLTune520BT_Blue_1_600x.png?v=1689752682";

const ProductDetails = (props) => {

  const dispatch = useDispatch()
  const userRole = localStorage.getItem("userRole")


  const [img, setImg] = useState();

  const [count, setCount] = useState(1);
  const increaseCount = () => {
    if (count < productDetails?.quantity) {
      setCount(count + 1);
    }
  };
  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["get-product-details"],
    queryFn: () => {
      return getProductDetails(params?.id);
    },
  });
  const productDetails = data?.data?.productDetails;

const{isLoadingCart, mutate}=useMutation({
  mutationKey:["add-product-cart"],
  mutationFn:async()=>{
return await $axios.post("/cart/item/add",{
  productId:params?.id,
  orderedQuantity:count
})
  },
  onSuccess:(res)=>{
    dispatch(openSuccessSnackbar(res?.data?.message))
    queryClient.invalidateQueries("cart-count");
  },
  onError:(error)=>{
    dispatch(openErrorSnackbar(error?.response?.data?.message))
  }
})

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "35px",
          marginTop: "10px",
          background: "",
        }}
      >
        <Grid container className="productDetails">
          {/* using Grid for left side image */}
          <Grid item lg={6} md={6} xs={12} sx={{ background: "" }}>
            <img
              src={productDetails?.image || fallBackImage}
              alt="Image"
              width="450px"
              height="450px"
            />
          </Grid>

          {/* using Grid for right side name, description, price, etc */}
          <Grid item lg={6} md={6} xs={12}>
            {/* For name*/}
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textAlign: "start",
                color: "black",
              }}
            >
              {productDetails?.name}
            </Typography>

            {/* For price*/}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "start",
                color: "#D71313",
              }}
            >
              Rs.{productDetails?.price}
            </Typography>

            {/* For description*/}
            <p style={{ textAlign: "justify", paddingRight: "20px" }}>
              {productDetails?.description}
            </p>

            {/* For category and brand*/}
            <Stack
              gutterBottom
              flexDirection="row"
              gap="1rem"
              alignItems="center"
            >
              <Typography sx={{ textAlign: "start" }}>
                Category <Chip label={productDetails?.category} />
              </Typography>
              <Typography sx={{ textAlign: "start" }}>
                Brand <Chip label={productDetails?.brand} />
              </Typography>
              <Box>
                <Typography>Free Shipping</Typography>
              </Box>
              <Box>
                <Checkbox checked={productDetails?.freeShipping} />
              </Box>
            </Stack>

            {/* For color text*/}
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ fontWeight: "" }}>Color:</Typography>

              {/* For state change function for black color image */}
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  background: "black",
                  color: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImg(
                    "https://audioshopnepal.com/wp-content/uploads/2023/05/2305231511160.jpeg"
                  );
                }}
              ></Box>

              {/* For state change function for blue color image */}
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  background: "#2B3467",
                  color: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImg(
                    "https://jblstore.com.ph/cdn/shop/files/JBLTune520BT_Blue_1_600x.png?v=1689752682"
                  );
                }}
              ></Box>

              {/* For state change function for red color image */}
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  background: "#D71313",
                  color: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setImg(
                    "https://appleman.pk/cdn/shop/products/JBL-Tune-700BT-1_1024x.jpg?v=1667818203"
                  );
                }}
              ></Box>
            </Box>

            {/* For available quantity */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "start",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ color: "green" }}>
                Available Quantity: <span>{productDetails?.quantity}</span>
              </Typography>
            </Box>

            {/* If User role is buyer */}
            {userRole === "buyer" && (
              <>
                {/* For quantity field */}
                {/* For order counter or quantity */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "start",
                    marginTop: "10px",
                    gap: "10px",
                  }}
                >
                  <IconButton
                   disabled={count===1}
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "0",
                      color: "grey",
                    }}
                    onClick={decreaseCount}
                  >
                    <RemoveIcon sx={{ background: "#EBEBEB" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      width: "30px",
                      height: "30px",
                      textAlign: "center",
                      marginTop: "8px",
                    }}
                  >
                    {count}
                  </Typography>
                  <IconButton
                  disabled={productDetails.quantity===count}
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "0",
                      color: "grey",
                    }}
                    onClick={increaseCount}
                  >
                    <AddIcon sx={{ background: "#EBEBEB" }} />
                  </IconButton>
                </Box>
                {/* For Shipping yes or no */}

                {/* For add to cart button */}
                <Box sx={{ textAlign: "start", marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    sx={{ background: "black", color: "white" }}
                  onClick={()=>{
                    mutate()
                  }}>
                    Add to Cart
                  </Button>
                </Box>
              </>
            )}

            {/* If User role is seller */}
            {userRole === "seller" && (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Box sx={{ textAlign: "start", marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{ background: "black", color: "white" }}
                    onClick={() => {
                      navigate(`/product/edit/${productDetails._id}`);
                    }}
                  >
                    <Typography>Edit Product</Typography>
                  </Button>
                </Box>

                {/* For Delete icon dialog box */}
                <Box sx={{ textAlign: "start", marginTop: "10px" }}>
                  <DeleteProductDialog />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductDetails;
