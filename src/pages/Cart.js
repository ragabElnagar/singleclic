import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
  CardMedia,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import { total } from "../utils/totalPrice";
import CustomDialog from "../components/CustomDialog";

const Cart = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cartItems");
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleQuantityChange = (item, type) => {
    if (type === "increment") {
      updateQuantity(item.id, item.quantity + 1);
    } else if (type === "decrement" && item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleClearCart = () => {
    clearCart();
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ padding: 3, maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        <ShoppingCart color="primary" /> Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToHome}
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              paddingX: 4,
            }}
          >
            Go to Home
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    justifyContent: "space-between",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      height: 180,
                      objectFit: "contain",
                      borderRadius: 2,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        marginBottom: 1,
                        fontWeight: 600,
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ marginBottom: 1 }}
                    >
                      ${item.price.toFixed(2)} x {item.quantity} ={" "}
                      <strong>
                        ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item, "decrement")}
                        disabled={item.quantity === 1}
                        sx={{
                          backgroundColor: "#f0f0f0",
                          "&:hover": { backgroundColor: "#ddd" },
                        }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item, "increment")}
                        sx={{
                          backgroundColor: "#f0f0f0",
                          "&:hover": { backgroundColor: "#ddd" },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Delete />}
                      onClick={() => removeFromCart(item.id)}
                      sx={{
                        borderRadius: 1,
                        paddingX: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ marginY: 3 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              marginTop: 3,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Total: ${total(cartItems).toFixed(2)}
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={() => setIsDialogOpen(true)}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  paddingX: 4,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#f44336",
                    color: "white",
                  },
                }}
              >
                Clear Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleGoToHome}
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  paddingX: 4,
                  fontWeight: 600,
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
          <CustomDialog
            handleClearCart={handleClearCart}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={() => setIsDialogOpen(false)}
          />
        </>
      )}
    </Box>
  );
};

export default Cart;
