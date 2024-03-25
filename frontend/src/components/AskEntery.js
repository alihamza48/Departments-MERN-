import React from "react";
import { useNavigate } from "react-router-dom";

const AskEntery = () => {
  const navigation = useNavigate();

  const NavigateHandler = () => {
    navigation("/users/dept");
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className="text-black-500 text-center flex flex-col shadow-2xl border border-gray-600 rounded-md
         mt-20 w-72 "
      >
        <label className="p-2 font-bold mb-10">To Enter a Department</label>
        <button
          className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
          onClick={NavigateHandler}
        >
          Go To Entry Page
        </button>
      </div>
    </div>
  );
};

export default AskEntery;
