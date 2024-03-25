import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setName, setLogo } from "../store/dept";

const DeptItem = (props) => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.department.name);
  const logo = useSelector((state) => state.department.logo);

  const nameChangeHandler = (event) => {
    dispatch(setName(event.target.value));
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/department/depts",
        {
          method: "DELETE",
          body: JSON.stringify({ id: props.id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete record");
      }
      props.onDelete(props.id);
      console.log("Record deleted successfully");
    } catch (error) {
      throw new Error("Could Not Delete", 400);
    }
  };

  const toggleHandler = () => {
    setShow(true);
    setHide(false);
  };

  const updateHandler = async (dept) => {
    try {
      await fetch("http://localhost:5000/api/department/update", {
        method: "PATCH",
        body: JSON.stringify({
          id: props.id,
          name: name,
          logo: logo,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log("Not Updated");
    }
    navigate("/users");
    console.log("Updated");
  };

  return (
    <>
      {show && (
        <li className="text-black-500 text-center flex flex-col border border-gray-600 rounded-md mt-2 mb-2 w-72 ">
          <div>
            <input value={name} onChange={nameChangeHandler} />
            <div className="flex justify-center items-center mt-2">
              <img
                className="w-24 h-24 object-cover"
                src={props.logo}
                alt="No Image Found"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
              onClick={() => updateHandler(props)}
              id={props._id}
            >
              Update
            </button>
          </div>
        </li>
      )}

      {hide && (
        <li className="text-black-500 text-center flex flex-col border border-gray-600  mt-2 mb-2 w-72 ">
          <div>
            <h2 className="underline font-bold">{props.name}</h2>
            <div className="flex justify-center items-center mt-2">
              <img
                className="w-24 h-24 object-cover"
                src={props.logo}
                alt="No Image Found"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
              // onClick={() => updateHandler(props)}
              onClick={toggleHandler}
              id={props._id}
            >
              Update
            </button>
            <button
              className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
        </li>
      )}
    </>
  );
};
export default DeptItem;

// <div>
//   <h2>{props.name}</h2>
//   <div>{props.image}</div>
// </div>
