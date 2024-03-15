import React, { useState } from "react";
import ProductCard from "../Components/ProductCard";
import { CircularProgress, Grid, Pagination, Stack } from "@mui/material";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";

const BuyerProductList = () => {
  const [currentPage,setCurrentPage]= useState(1)
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", { page: currentPage, limit: 4 });
    },
  });
  const productList = data?.data?.productList;
  const numberOfPages = data?.data?.numberOfPages
  if (isLoading) {
    return <CircularProgress color="primary" />;
  }
  return (
    <>
    <Grid
      container
      gap="2rem"
      sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap",background:"",paddingBottom:"30px" }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
     
    </Grid>
    <Stack alignItems="center">
    <Pagination count={numberOfPages} page={currentPage} onChange={(_,page)=>{
        setCurrentPage(page)

      }} />
      </Stack>
    </>
  );
};

export default BuyerProductList;
