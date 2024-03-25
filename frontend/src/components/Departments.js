import React, { useState, useEffect } from "react";
import NavBar from "../UIComponents/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setName, setLogo } from "../store/dept";
import ShowDepts from "../reusable/ShowDepts";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.department.name);
  const logo = useSelector((state) => state.department.logo);
  const [loadedDepartments, setLoadedDepartments] = useState();

  dispatch(
    setLogo(
      "https://images.pexels.com/photos/18818714/pexels-photo-18818714/free-photo-of-gallery-in-italy.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
    )
  );

  const nameChangeHandler = (event) => {
    dispatch(setName(event.target.value));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await fetch("http://localhost:5000/api/department/dept", {
        method: "POST",
        body: JSON.stringify({ name: name, logo: logo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err.message);
      throw new Error("Could not submit", 400);
    }
    navigation("/users");
  };

  useEffect(() => {
    const sendRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/department/depts"
        );
        const responseData = await response.json();
        setLoadedDepartments(responseData.departments);
      } catch (error) {}
    };

    sendRequests();
  }, []);

  const deptDeletedHandler = (deletedDeptId) => {
    setLoadedDepartments((prevDept) =>
      prevDept.filter((dept) => dept.id !== deletedDeptId)
    );
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="flex justify-center items-center ">
        <form
          onSubmit={submitHandler}
          className="text-black-500 text-center flex flex-col shadow-2xl border border-gray-600 rounded-md
     mt-20 w-72 "
        >
          <label htmlFor="email" className="p-2 font-bold">
            Enter Name
          </label>
          <input
            onChange={nameChangeHandler}
            value={name}
            type="text"
            id="name"
            name="name"
            className="border border-black-300 p-2"
          />
          <div className="flex justify-center items-center mt-2">
            <img
              className="w-24 h-24 object-cover"
              src={logo}
              alt="Image Not Found"
            />
          </div>
          <button
            type="submit"
            className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
          >
            Create Department
          </button>
        </form>
      </div>
      <p className="text-center">
        --------------------------------------------------------------------------------------
      </p>
      <ShowDepts items={loadedDepartments} onDeleteDept={deptDeletedHandler} />
      {/* <DeptItem items={loadedDepartments} /> */}
    </React.Fragment>
  );
};

export default Departments;
