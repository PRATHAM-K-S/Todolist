import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  todoCount: 0,
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.todos = action.payload;
    },
    clearTodos: (state) => {
      state.todos = [];
    },
    increment: (state) => {
      state.todoCount = state.todoCount + 1;
    },
  },
});

export const { addTodos, clearTodos, increment } = todoListSlice.actions;

export default todoListSlice.reducer;
