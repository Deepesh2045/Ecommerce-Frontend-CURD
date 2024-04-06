import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import $axios from "../lib/axios.instance";
import Loading from "../Components/Loading";
import { useDispatch } from "react-redux";
import { openErrorSnackbar } from "../store/slices/snackBarSlice";
import { Box, Typography } from "@mui/material";



  const tableHeaders = [
    "S.N",
    "Product",
    "Ordered Qty",
    "Unit Price",
    "Sub Total",
    "Buyer Name",
    "Buyer Email",
    "Payment Status"
  ]

const orderDetails = () => {
  const dispatch = useDispatch()
  const {isLoading, data}= useQuery({
    queryKey:["seller-order-details"],
    queryFn:async(value)=>{
        return await $axios.get("/order/list",value)
    },
    onError:(err)=>{
      dispatch(openErrorSnackbar(err?.response?.data?.message))
    }
})
const orders = data?.data?.orders

if(isLoading){
  return <Loading/>
}
  return (
   <>
   <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",background:"",padding:"2rem"}}>
   <Box sx={{width:"100%"}}>
   <Typography variant="h5" sx={{marginBottom:"1rem",fontWeight:"bold"}}>ORDER LIST</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{background:"black"}}>
          <TableRow  >
            {tableHeaders.map((item,index)=>{
              return <TableCell align="center" key={index} sx={{color:"white"}}>{item}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{background:"#dadada"}}>
          {orders.map((item,index) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{item.productData.name}</TableCell>
              <TableCell align="center">{item.orderedQuantity}</TableCell>
              <TableCell align="center">{item.unitPrice}</TableCell>
              <TableCell align="center">{item.subTotal}</TableCell>
              <TableCell align="center">{`${item.buyerData.firstName} ${item.buyerData.lastName}`}</TableCell>
              <TableCell align="center">{item.buyerData.email}</TableCell>
              <TableCell align="center"sx={{color:"green"}}>{item.paymentStatus}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
   </>
  );
};
export default orderDetails;
