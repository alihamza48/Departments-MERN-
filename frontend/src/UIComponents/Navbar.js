import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../store/auth";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.loggedIn);

  const clickHandler = () => {
    dispatch(setLoggedIn(false));
    navigate("/");
  };
  const emailHandler = () => {
    navigate("/users/email");
  };
  return (
    <div className="flex justify-between items-center border border-black bg-gray-300 p-2">
      <h2 className="text-left font-bold">Departments.pk</h2>
      <button
        className="text-white bg-blue-600 hover:bg-blue-400 px-4 py-2 rounded-md"
        onClick={emailHandler}
      >
        Send Email
      </button>
      <button
        className="text-white bg-black hover:bg-gray-700 px-4 py-2 rounded-md"
        onClick={clickHandler}
      >
        LogOut
      </button>
    </div>
  );
};
export default NavBar;
