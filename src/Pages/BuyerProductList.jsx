import { CircularProgress, Grid, Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProductCard from "../Components/ProductCard";
import $axios from "../lib/axios.instance";
import SearchBar from "../Components/SearchBar";
import { useSelector } from "react-redux";
import NoProductFound from "../Components/NoProductFound";
import Loading from "../Components/Loading";

const BuyerProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchProduct, category, minPrice, maxPrice, isFilterApplied  } = useSelector(
    (state) => state.product
  );

  const { isLoading, isError, error, data } = useQuery({
    queryKey: [
      "buyer-product-list",
      currentPage,
      searchProduct,
      category,
      minPrice,
      maxPrice,
      isFilterApplied,
    ],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: currentPage,
        limit: 4,
        searchProduct: searchProduct,
        category:category?category:null,
        minPrice,
        maxPrice,
        isFilterApplied,
      });
    },
  });
  const productList = data?.data?.productList;
  const numberOfPages = data?.data?.numberOfPages;
  if (isLoading) {
    return <Loading/>;
  }
  return (
    <>
      <SearchBar />
      {productList<=0?<NoProductFound/>:<Grid
        container
        gap="2rem"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          background: "",
          paddingBottom: "30px",
        }}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />;
        })}
      </Grid>}
      
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

export default BuyerProductList;
