import { useState, useEffect } from 'react';
import { fetchProductDetails } from '../services/productService';
import { useParams } from "react-router-dom";

const useProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
      } catch (error) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, []);

  return { product, loading, error };
};

export default useProductDetail;
