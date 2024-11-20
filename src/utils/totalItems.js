export const totalItems =(cartItems)=>{
   return cartItems.reduce((sum, item) => sum + item.quantity, 0);
} 
