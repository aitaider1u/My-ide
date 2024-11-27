import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import codeReducer from './features/codeSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    code: codeReducer,
  },
});

export default store;