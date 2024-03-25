const express = require("express");
const router = express.Router();
const Department = require("../models/dept-shema");

// Create a department
// router.get("/",
const createDept = async (req, res, next) => {
  const department = new Department({
    name: req.body.name,
    logo: req.body.logo,
  });
  let newDepartment;
  try {
    newDepartment = await department.save();
  } catch (error) {
    return next(new Error("Cant Create Depts", 400));
  }
  res.status(201).json({
    name: newDepartment.name,
    logo: newDepartment.logo,
  });
};

// Get all departments
// router.post("/",

const getDept = async (req, res, next) => {
  let departments;
  try {
    departments = await Department.find();
  } catch (error) {
    return next(new Error("Cant Get Depts" + error, 400));
  }
  res.json({
    departments: departments.map((dept) => dept.toObject({ getters: true })),
  });
};

// Get a single department
// router.get("/:id", getDepartment, (req, res) => {
//   res.json(res.department);
// });

const getDeptById = async (req, res, next) => {
  const id = req.body.id;
  let dept;
  try {
    dept = await Department.findById(id);
  } catch (error) {
    return next(new Error("Could not Retrieve any department.", 500));
  }

  if (!dept) {
    return next(
      new Error("Couldn't find a place for the provided department ID.", 404)
    );
  }

  res.json({ departments: dept.toObject({ getters: true }) });
};

// Update a department
// router.patch("/:id",

const updateDept = async (req, res, next) => {
  const { id, name, logo } = req.body;
  let dept;
  try {
    dept = await Department.findById(id);
  } catch (error) {
    return next(new Error("Could not find the Department", 500));
  }

  dept.name = name;
  dept.logo = logo;

  try {
    await dept.save();
  } catch (error) {
    return next(new Error("Could not update the department", 500));
  }

  res.status(200).json({ department: dept.toObject({ getters: true }) });
};

// Delete a department
// router.delete("/:id",

const deleteDept = async (req, res, next) => {
  const id = req.body.id;
  let dept;
  try {
    dept = await Department.findById(id);
  } catch (error) {
    return next(new Error("Could not find the Department", 500));
  }

  try {
    await dept.deleteOne();
  } catch (error) {
    console.log(error);
    return next(new Error("Could not Delete the place", 500));
  }

  res.status(200).json({ message: "Department Deleted" });
};

exports.getDept = getDept;
exports.createDept = createDept;
exports.deleteDept = deleteDept;
exports.getDeptById = getDeptById;
exports.updateDept = updateDept;
