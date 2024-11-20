import React from "react";
import {  useNavigate } from "react-router-dom";
import { CircularProgress, Typography, Box, Button } from "@mui/material";
import { useCart } from "../contexts/CartContext";
import useProductDetail from "../hooks/ProductDetail";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { product, loading } = useProductDetail();
  const navigate = useNavigate();

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!product) return <Typography>Product not found.</Typography>;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{ width: "100%", maxWidth: 400 }}
      />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {product.description}
      </Typography>
      <Typography variant="h5" color="primary" sx={{ marginTop: 2 }}>
        ${product.price}
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleGoToHome}>
          Go to Home
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetail;
