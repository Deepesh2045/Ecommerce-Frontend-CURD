import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import $axios from "../lib/axios.instance";
import NoCartItem from "./NoCartItem";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackBarSlice";

const Cart = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // cart item List
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["cart-item-list"],
    queryFn: async () => {
      return await $axios.get("/cart/item/list");
    },
  });
  console.log(data);
  const cartItem = data?.data?.cartItem;
  const orderSummary = data?.data?.orderSummary;
  const grandTotal = data?.data?.grandTotal;
  const productDataForOrdering = cartItem?.map((item)=>{
    return {
      productId:item?.productId,
      orderedQuantity:item?.orderedQuantity,
      sellerId:item?.sellerId,
      unitPrice: item?.price,
      subTotal: item?.subTotal,
    }
  })
// console.log(productDataForOrdering)
  // remove cart
  const { isLoading: removeItemLoading, mutate } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: async (productId) => {
      return await $axios.delete(`/cart/item/remove/${productId}`);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries("cart-item-list");
      queryClient.invalidateQueries("cart-count");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // Flush Cart
  const { isLoading: flushCartLoading, mutate: flushCartMutate } = useMutation({
    mutationKey: ["flush-cart"],
    mutationFn: async () => {
      return await $axios.delete("/cart/flush");
    },
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message));
      queryClient.invalidateQueries("cart-item-list");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  // Update order quantity
  const { isLoading: updateCartQuantityLoading, mutate: updateQuantityMutate } =
    useMutation({
      mutationKey: ["update-order-quantity"],
      mutationFn: async ({ productId, action }) => {
        return await $axios.put(`/cart/update/quantity/${productId}`, {
          action,
        });
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries("cart-item-list");
        dispatch(openSuccessSnackbar(res?.data?.message));
      },
      onError: (error) => {
        dispatch(openErrorSnackbar(error?.response?.data?.message));
      },
    });

    // Payment
  const { isLoading: paymentLoading, mutate: paymentMutate } = useMutation({
    mutationKey: ["initiate-khalti-payment"],
    mutationFn: async () => {
      return await $axios.post("/payment/khalti/start", {
        amount: grandTotal,
        productList: productDataForOrdering,
      });
    },
    onSuccess:(res)=>{
      const paymentUrl = res?.data?.paymentDetails?.payment_url;
      window.location.href = paymentUrl
    },
    onError:()=>{
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    }
  });

  if (isLoading || updateCartQuantityLoading || paymentLoading) {
    return <Loading />;
  }

  if (cartItem.length === 0) {
    return <NoCartItem />;
  }

  return (
    <>
      <Grid
        display="flex"
        container
        sx={{ width: "100%", background: "lightgrey", paddingBottom: "80px" }}
      >
        <Grid lg={8} xs={12} sx={{ background: "" }}>
          {cartItem?.map((item) => {
            return (
              <Grid
                key={item._id}
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                alignItems="center"
                item
                sx={{
                  width: "95%",
                  // height: "150px",
                  background: "#fff",
                  padding: "1rem",
                  margin: "20px",
                }}
              >
                <Box>
                  <Checkbox defaultChecked />
                </Box>
                <Box sx={{ margin: "auto" }}>
                  <img src={item?.image} alt={item.name} width="125px" />
                </Box>
                <Box
                  sx={{
                    background: "",
                    textAlign: "start",
                    width: "40%",
                    flexBasis: "350px",
                  }}
                >
                  <Typography variant="h6">
                    {item.name} <Chip label={item?.brand} />
                  </Typography>

                  <Typography>{item?.description.substring(0, 50)}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Rs.{item?.price}</Typography>
                </Box>

                <Stack flexDirection="row" alignItems="center" gap="8px">
                  <Box>
                    <IconButton
                      disabled={
                        updateCartQuantityLoading || item?.orderedQuantity === 1
                      }
                      onClick={() => {
                        updateQuantityMutate({
                          productId: item?.productId,
                          action: "dec",
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="h6">{item?.orderedQuantity}</Typography>
                  <Box>
                    <IconButton
                      disabled={updateCartQuantityLoading}
                      onClick={() => {
                        updateQuantityMutate({
                          productId: item?.productId,
                          action: "inc",
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Stack>
                <Box>
                  <IconButton
                    onClick={() => {
                      mutate(item?.productId);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>
            );
          })}

          <Box
            sx={{
              width: "100%",
              background: "",
              padding: "0rem 1rem 0rem 1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => {
                flushCartMutate();
              }}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        <Grid item lg={4}>
          <Box
            sx={{
              width: "95%",
              background: "#fff",
              marginTop: "20px",
              padding: "2rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "start" }}
            >
              Order Summary
            </Typography>
            <Stack
              spacing={1}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>Sub Total</Typography>
              <Typography>Rs.{orderSummary.subTotal}</Typography>
            </Stack>
            <Stack
              spacing={1}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>Discount</Typography>
              <Typography> Rs.{orderSummary.discount}</Typography>
            </Stack>

            <Stack flexDirection="row" gap="10px" sx={{ marginTop: "10px" }}>
              <TextField
                placeholder="Enter Voucher Code"
                size="small"
                fullWidth
                sx={{ textAlign: "start" }}
              />
              <Button variant="contained">Apply</Button>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              sx={{ marginTop: "10px" }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Grand Total</Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                {" "}
                Rs.{orderSummary.grandTotal}
              </Typography>
            </Stack>
            <Button variant="contained" fullWidth sx={{ marginTop: "10px" }} onClick={()=>{
              paymentMutate()
            }}>
              PAY WITH KHALTI
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
