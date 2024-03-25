const express = require("express");
const router = express.Router();

const deptController = require("../controllers/dept-controller");

router.post("/dept", deptController.createDept);
router.get("/depts", deptController.getDept);
// router.delete("/update", deptController.getDeptById);
router.delete("/depts", deptController.deleteDept);
router.patch("/update", deptController.updateDept);

// router.get("/:id/child-departments", deptController.getChildDept);
// router.get("/:id/parent-departments", deptController.getParentDept);

module.exports = router;
