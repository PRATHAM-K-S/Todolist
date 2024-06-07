import React, { useState } from "react";
import { Input, Button, Container, Loader } from "../components/";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/services/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/features/authSlice";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userdata = await authService.login(data);
      // console.log(userdata);
      if (userdata) {
        setLoading(false);
        dispatch(login(userdata));
        navigate("/");
      } else throw "Invalid password or email";
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Container className="flex flex-col mx-auto h-[90vh] items-center justify-center gap-8">
      {loading && (
        <div className="h-[110%] w-full absolute flex justify-center items-center bg-white/60">
          <Loader />
        </div>
      )}
      <h2 className="text-3xl font-bold">Todolist</h2>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      <form
        onSubmit={handleSubmit(signup)}
        className="w-3/4 sm:w-full flex flex-col gap-8"
      >
        {" "}
        <Controller
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="user@gmail.com"
              className="outline-none border-2 transition-all focus:border-black text-sm py-2"
              {...field}
            />
          )}
          name="email"
          rules={{ required: true }}
          control={control}
          defaultValue=""
        />
        <div>
          <Controller
            render={({ field }) => (
              <Input
                label="Password"
                type="password"
                placeholder="password"
                className="outline-none border-2 transition-all focus:border-black text-sm py-2"
                {...field}
              />
            )}
            name="password"
            rules={{ required: true, minLength: 8 }}
            control={control}
            defaultValue=""
          />
          {errors.password && (
            <p className="text-xs text-red-700">
              Password must contain atleast 8 characters.
            </p>
          )}
        </div>
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
