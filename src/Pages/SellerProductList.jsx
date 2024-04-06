import { Box, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";
import SellerDrawer from "../Components/SellerDrawer";
import $axios from "../lib/axios.instance";
const SellerProductList = () => {
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate("/add-product");
  };
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["seller-product-list", currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 4,
      });
    },
  });
  const productList = data?.data?.productList;
  const numberOfPages = data?.data?.numberOfPages;

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
  <SellerDrawer/>
      <Box>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            width: "100%",
            marginTop: "0px",
            paddingTop: "0px",
            paddingLeft: "60px",
            paddingBottom: "30px",
            // paddingLeft:"2rem"
          }}
        >
          {productList.map((item) => {
            return <ProductCard key={item._id} {...item} />;
          })}
        </Box>
      </Box>
      <Stack alignItems="center">
        <Pagination
          count={numberOfPages}
          page={currentPage}
          onChange={(_, page) => {
            setCurrentPage(page);
          }}
        />
      </Stack>
    </>
  );
};

export default SellerProductList;
