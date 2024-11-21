import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={(e)=>handleViewDetails(e)}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{
          objectFit: "contain",
          paddingTop:"10px"
        }}
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <Button variant="outlined" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button
          variant="contained"
          onClick={(e)=>handleViewDetails(e)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
