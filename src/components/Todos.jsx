import React, { useEffect, useState } from "react";
import appwriteDataService from "../appwrite/services/database";
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../store/features/todolListSlice";
import { Todo, Container } from "./";

const Todos = () => {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const reduxtodos = useSelector((state) => state.todoList.todos);
  const dispatch = useDispatch();

  const getTodos = async () => {
    const todos = await appwriteDataService.getTodos(userData.$id);
    if (todos) {
      dispatch(addTodos([...todos.documents]));
    }
  };

  // console.log(reduxtodos);

  useEffect(() => {
    authStatus && getTodos();
  }, [useSelector((state) => state.todoList.todoCount)]);

  return (
    <Container className="md:max-w-2xl lg:max-w-4xl mx-auto">
      <div className="mx-6 md:mx-0">
        <h2 className="my-8 font-semibold text-xl">Your Todos</h2>
      </div>
      <div className="mx-6 md:mx-0">
        {reduxtodos.map((todo) => {
          return (
            <Todo
              key={todo.$id}
              title={todo.title}
              description={todo.description}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Todos;
