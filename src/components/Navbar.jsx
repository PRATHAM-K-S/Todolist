import React from "react";
import { Button, ButtonOutline } from "./";
import { useHref, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/services/auth";
import { logout } from "../store/features/authSlice";

const Navbar = () => {
  const href = useHref();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  // {console.log(userData)}

  const logoutsession = async () => {
    await authService.logout();
    dispatch(logout());
  };

  return (href !== "/signup" && href !== "/login") ? (
    <nav className="my-6">
      <div className="flex justify-between items-center sm:mx-auto mx-8 max-w-3xl">
        <h1 className="text-3xl font-bold">Todolist</h1>
        {authStatus !== true ? (
          <div className="flex w-full justify-end gap-2">
            <Button onClick={() => navigate("/login")} className="text-sm px-6">
              Login
            </Button>
            <ButtonOutline
              onClick={() => navigate("/signup")}
              className="px-6 text-sm hover:bg-black hover:text-white transition-colors"
            >
              Signup
            </ButtonOutline>
          </div>
        ) : (
          <Button onClick={() => logoutsession()} className="text-sm px-6">
            Logout
          </Button>
        )}
      </div>
    </nav>
  ) : null;
};

export default Navbar;
