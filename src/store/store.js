import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/authSlice";
import todoListReducer from "../store/features/todolListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todoList: todoListReducer,
  },
});
