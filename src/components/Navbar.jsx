import React, { useState } from "react";
import { Button, ButtonOutline } from "./";
import { useHref, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../appwrite/services/auth";
import { logout } from "../store/features/authSlice";
import { clearTodos } from "../store/features/todolListSlice";
import { Loader } from "./";

const Navbar = () => {
  const href = useHref();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // {console.log(userData)}

  const logoutsession = async () => {
    setError("");
    setLoading(true);
    try {
      const logout = await authService.logout();
      if (logout) {
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
    dispatch(logout());
    dispatch(clearTodos());
  };

  return href !== "/signup" && href !== "/login" ? (
    <nav className="my-6 mx-8 md:max-w-2xl lg:max-w-4xl md:mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Todolist</h1>
        {authStatus !== true ? (
          <div className="flex w-full justify-end gap-2">
            <Button onClick={() => navigate("/login")} className="text-sm px-6">
              Login
            </Button>
            <ButtonOutline
              onClick={() => navigate("/signup")}
              className="px-6 text-sm hidden sm:block hover:bg-black hover:text-white transition-colors"
            >
              Signup
            </ButtonOutline>
          </div>
        ) : (
          <Button onClick={() => logoutsession()} className="text-sm px-6 flex gap-1 items-center">
            Logout {loading && <Loader width="w-4" height="h-4" fillColor="fill-white"/>}
          </Button>
        )}
      </div>
    </nav>
  ) : null;
};

export default Navbar;
