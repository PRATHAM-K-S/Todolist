import React, { useState } from "react";
import { Input, Button, Container } from "../components/";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/services/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";

const Login = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    try {
      const userdata = await authService.login(data);
      if (userdata) {
        dispatch(login(userdata));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container className="flex flex-col h-[90vh] items-center justify-center gap-8">
      <h2 className="text-3xl font-bold">Todolist</h2>
      {error && <p className="text-red-600 font-semibold">{error}</p>}
      <form
        onSubmit={handleSubmit(signup)}
        className="w-full flex flex-col gap-8"
      >
        {" "}
        <Controller
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="user@gmail.com"
              className="outline-none border-2 transition-all focus:border-black text-sm py-2"
              control={control}
              {...field}
            />
          )}
          name="email"
          rules={{ required: true }}
          control={control}
          defaultValue=""
        />
        <Controller
          render={({ field }) => (
            <Input
              label="Password"
              type="password"
              placeholder="password"
              className="outline-none border-2 transition-all focus:border-black text-sm py-2"
              control={control}
              {...field}
            />
          )}
          name="password"
          rules={{ required: true }}
          control={control}
          defaultValue=""
        />
        <Button type="submit" className="hover:bg-gray-900 transition-all">
          Login
        </Button>
      </form>
      <p>
        Don't have an account?
        <Link to={"/signup"} className="font-semibold text-blue-700">
          Create Account
        </Link>
      </p>
    </Container>
  );
};

export default Login;
