import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  ModalProduct: null,
  cart: [],
  AllProduct: [],
};

const ProductsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    SetActiveUser: (state, actions) => {
      state.user = actions.payload;
    },
    AddProduct: (state, actions) => {
      state.AllProduct = actions.payload;
    },
    ModalItem: (state, actions) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.ModalProduct = actions.payload;
    },
    CartItemFromLS: (state, actions) => {
      state.cart = actions.payload;

      localStorage.removeItem('local_cart');
    },
    AddLSDbCart: (state, actions) => {
      state.cart = actions.payload;
    },
    CartItem: (state, actions) => {
      state.cart = [...state.cart, actions.payload];
      if (!state.user) {
        localStorage.setItem('local_cart', JSON.stringify(state.cart));
      }
    },
    RemoveItemFromCart: (state, actions) => {
      state.cart = actions.payload;
      if (!state.user) {
        localStorage.setItem('local_cart', JSON.stringify(state.cart));
      }
    },
    ModifyExistingCartItem: (state, actions) => {
      const { quantity, _id, age } = actions.payload;

      state.cart = state?.cart?.map((items) => {
        return items._id === _id && items.age === age
          ? { ...items, quantity }
          : items;
      });
      if (!state.user) {
        localStorage.setItem('local_cart', JSON.stringify(state.cart));
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  ModalItem,
  CartItem,
  ModifyExistingCartItem,
  AddProduct,
  RemoveItemFromCart,
  SetActiveUser,
  CartItemFromLS,
  AddLSDbCart,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
