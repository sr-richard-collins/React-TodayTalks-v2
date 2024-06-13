import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Middleware for async actions
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

// export const store = createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production', // Enable only in development
  });

  export default store;