import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

function CustomDialog(props) {
  const { handleClearCart, isDialogOpen, setIsDialogOpen } = props;

  return (
    <Dialog
      open={isDialogOpen}
      aria-labelledby="clear-cart-dialog-title"
      aria-describedby="clear-cart-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
      BackdropProps={{
        inert: "true",
      }}
    >
      <DialogTitle
        id="clear-cart-dialog-title"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          backgroundColor: "#f44336",
          color: "white",
          paddingY: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Confirm Clear Cart
      </DialogTitle>

      <DialogContent
        sx={{
          paddingY: 2,
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <DialogContentText
          id="clear-cart-dialog-description"
          sx={{
            fontSize: "16px",
            color: "text.secondary",
            lineHeight: 1.5,
          }}
        >
          Are you sure you want to clear all items from your cart? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingX: 3,
          paddingBottom: 2,
        }}
      >
        <Button
          onClick={setIsDialogOpen}
          color="primary"
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            paddingX: 3,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClearCart}
          color="error"
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            paddingX: 3,
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Clear Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CustomDialog;
