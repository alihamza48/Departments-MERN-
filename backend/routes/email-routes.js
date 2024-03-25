const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email");

router.post("/reminder", emailController.createRem);
router.get("/reminder", emailController.sendRem);

module.exports = router;
