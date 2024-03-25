const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoutes = require("./routes/user-routes");
// const deptRoutes = require("./routes/dept-routes");
const emailRoutes = require("./routes/email-routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const departmentRoutes = require("./routes/dept-routes");

app.use(bodyParser.json());

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type,Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.use("/api/auth", userRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/email", emailRoutes);

mongoose
  .connect(
    "mongodb+srv://alihamza:Theblues04@cluster0.pnjuo7i.mongodb.net/departments?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
