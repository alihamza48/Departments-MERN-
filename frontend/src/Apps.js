import React from "react";
import DepartmentList from "./comps/DepartmentList";
import CreateDepartment from "./comps/CreateDepartment";

function Apps() {
  return (
    <div>
      <h1>Department Manager</h1>
      <DepartmentList />
      <hr />
      <h2>Create a New Department:</h2>
      <CreateDepartment />
    </div>
  );
}

export default Apps;
