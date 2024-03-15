import { Box, Button, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";
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
      <Box>
        <Button variant="contained" onClick={goToAddProduct}>
          Add Product
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "2rem",
            width: "100%",
            marginTop: "20px",
            paddingTop: "20px",
            paddingBottom: "30px",
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
