import React, { useEffect } from "react";
import { AddTodo, Todos } from "../components";
import authService from "../appwrite/services/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser().then((data) => {
      if(data){
        dispatch(login(data));
      }
      else return
    });
  }, []);

  return (
    <>
      <AddTodo />
      <Todos />
    </>
  );
};

export default Home;
