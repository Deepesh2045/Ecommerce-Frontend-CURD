import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "../lib/apis";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openErrorSnackbar, openSuccessSnackbar } from "../store/slices/snackBarSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteProductDialog = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const params = useParams();
  const productId = params?.id;

  const { isLoading, mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await deleteProduct(productId);
    },
    onSuccess: (res) => {
      navigate("/products");
      queryClient.invalidateQueries("seller-product-list");
      dispatch(openSuccessSnackbar(res?.data?.message))
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message))
    },
  });
  return (
    <React.Fragment>
      <Button
        startIcon={<DeleteIcon />}
        variant="contained"
        sx={{ background: "#D04848", color: "white" }}
        onClick={handleClickOpen}
      >
        <Typography>Delete Product</Typography>
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure you want to delete this product</DialogTitle>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              mutate();
              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default DeleteProductDialog;
