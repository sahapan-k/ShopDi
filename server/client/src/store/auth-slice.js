import { createSlice } from '@reduxjs/toolkit';

let initialCartData, initialUserData;

const initialToken = localStorage.getItem('jwt');
const retrievedUserData = JSON.parse(localStorage.getItem('userData'));
const retrievedCartData = JSON.parse(localStorage.getItem('cartData'));

if (!retrievedUserData) {
  initialUserData = [];
} else {
  initialUserData = retrievedUserData;
}

if (!retrievedUserData || !retrievedUserData.cartData || !retrievedCartData) {
  initialCartData = [];
} else {
  initialCartData = retrievedCartData || retrievedUserData.cartData;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    isLogin: !!initialToken,
    userData: initialUserData,
    items: initialCartData,
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.token = action.payload.token;
      state.userData = action.payload.userData.user;
      if (action.payload.cartData) {
        state.items = action.payload.cartData;
      } else {
        state.items = [];
      }
      localStorage.setItem('jwt', state.token);
      localStorage.setItem('userData', JSON.stringify(state.userData));
      if (state.cartData)
        localStorage.setItem(
          'cartData',
          JSON.stringify(action.payload.cartData)
        );
    },
    logout(state) {
      state.isLogin = false;
      state.token = '';
      state.userData = [];
      state.items = [];
      localStorage.clear();
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          image: newItem.image,
          sellerName: newItem.sellerName,
          sellerProfilePhoto: newItem.sellerProfilePhoto,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      localStorage.setItem('cartData', JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      localStorage.setItem('cartData', JSON.stringify(state.items));
    },
    removeItemFromCartCompletely(state, action) {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
