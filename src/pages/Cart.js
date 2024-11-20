import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Paper,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { total } from "../utils/totalPrice";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
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

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
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
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      marginBottom: 2,
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6" noWrap sx={{ marginBottom: 1 }}>
                      {item.title}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item, "decrement")}
                        sx={{
                          padding: 1,
                          borderRadius: "50%",
                          backgroundColor: "#f0f0f0",
                          "&:hover": { backgroundColor: "#ddd" },
                        }}
                        disabled={item.quantity == 1}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="body1" sx={{ marginX: 2 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item, "increment")}
                        sx={{
                          padding: 1,
                          borderRadius: "50%",
                          backgroundColor: "#f0f0f0",
                          "&:hover": { backgroundColor: "#ddd" },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 2,
                      }}
                    >
                      <Typography variant="body1" color="text.secondary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end" }}
          >
            <Typography variant="h5">
              Total: ${total(cartItems).toFixed(2)}
            </Typography>
          </Box>
        </>
      )}

      <Box
        sx={{ display: "flex", gap: 2, marginTop: 3, justifyContent: "center" }}
      >
        <Button variant="contained" color="primary" onClick={handleGoToHome}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
