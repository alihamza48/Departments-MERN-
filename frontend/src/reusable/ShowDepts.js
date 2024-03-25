import React from "react";
import DeptItem from "./DeptItem";

const ShowDepts = (props) => {
  if (props.items?.length === 0) {
    return (
      <div className="center">
        <h2>No Departments Found</h2>
      </div>
    );
  }

  return (
    <ul className="flex justify-center items-center flex-col">
      {props.items?.map((dept) => (
        <DeptItem
          key={dept._id}
          id={dept._id}
          name={dept.name}
          logo={dept.logo}
          onDelete={props.onDeleteDept}
        />
      ))}
    </ul>
  );
};

export default ShowDepts;
