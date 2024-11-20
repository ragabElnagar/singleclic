import { get } from './apiClient';

export const fetchProducts = async () => {
  try {
    const response = await get('/products');
    return response; 
  } catch (error) {
    throw new Error('Error fetching products');
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await get(`/products/${id}`);
    return response;
  } catch (error) {
    throw new Error('Error fetching product details');
  }
};
