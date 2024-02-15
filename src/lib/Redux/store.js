import { configureStore } from '@reduxjs/toolkit';
import ProductsSlice from './Reducers/ProductReducer';

export default configureStore({
  reducer: {
    Product: ProductsSlice,
  },
});
