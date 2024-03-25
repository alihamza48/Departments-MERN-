import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, setLoggedIn } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);

  const emailChangeHandler = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const passwordChangeHandler = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Error Signing Up", 400);
      }

      console.log(dispatch(setLoggedIn(true)));
      navigation("/users");
      return data;
    } catch (err) {
      return new Error("Couldnt Sign Up", 404);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form
        onSubmit={submitHandler}
        className="text-black-500 text-center flex flex-col shadow-2xl border border-gray-600 rounded-md
         mt-20 w-72 "
      >
        <label htmlFor="email" className="p-2 font-bold">
          Enter Email
        </label>
        <input
          onChange={emailChangeHandler}
          value={email}
          type="email"
          id="email"
          name="email"
          className="border border-black-300 p-2"
        />
        <label htmlFor="password" className="p-2 font-bold">
          Enter Password
        </label>
        <input
          onChange={passwordChangeHandler}
          value={password}
          type="password"
          id="password"
          name="password"
          className="border border-black-300 p-2"
        />
        <button
          type="submit"
          className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
