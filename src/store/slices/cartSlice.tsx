// import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';


// const initialState = {
//     cartItems: localStorage.getItem('cartItems')
//         ? JSON.parse(localStorage.getItem('cartItems') || '{}')
//         : [],
//     cartTotalQuantity: 0,
//     cartTotalAmount: 0,
// };

// const cartSilce = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart(state, action) {
//             const itemIndex = state.cartItems.findIndex(
//                 (item: any) => item._id === action.payload._id,
//             );
//             if (itemIndex >= 0) {
//                 console.log('itemIndex: ', action.payload.quanity);
//                 state.cartItems[itemIndex].quanity += 1;
//                 toast.info('Tăng số lượng sản phẩm thành công !', {
//                     position: 'top-center',
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: 'light',
//                 });
//             } else {
//                 const tempProduct = { ...action.payload, quanity: 1 };
//                 console.log('tempProduct', action.payload);
//                 state.cartItems.push(tempProduct);
//                 toast.success('Thêm sản phẩm mới thành công !!', {
//                     position: 'top-center',
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: 'light',
//                 });
//             }
//             localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//         },
//     },
// });

// export const { addToCart } = cartSilce.actions;
// export default cartSilce.reducer;
