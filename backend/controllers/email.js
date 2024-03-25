const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Email = require("../models/email-schema");
const router = express.Router();

const app = express();
app.use(bodyParser.json());

// Set up nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "syednaqvi1881@gmail.com",
    pass: "npgt text pkjr isih",
  },
});

// Add a route to create a new reminder
// router.post("/reminder",

const createRem = async (req, res) => {
  const { email, date, time, message } = req.body;
  const datetime = new Date(`${date}T${time}`);
  let reminder = new Email({ email, date, time, message });
  try {
    await reminder.save();
  } catch (err) {
    throw new Error("Could not store scheduled email", 400);
  }
  res.send(reminder);
};

// Add a route to send reminders
// router.get("/reminder",

// router.get("/schedule-emails",

const sendRem = async (req, res) => {
  try {
    // Fetch scheduled emails from the database
    const emails = await Email.find();

    // Schedule emails using Nodemailer
    emails.forEach((emailData) => {
      const { _id, email, date, time, message } = emailData;
      const datetime = new Date(`${date}T${time}`);
      console.log(_id);
      // Schedule email
      transporter.sendMail(
        {
          from: "syednaqvi1881@gmail.com",
          to: email,
          subject: "Scheduled Email",
          text: message,
          date: datetime,
        },
        async (error, info) => {
          if (error) {
            console.error("Error scheduling email:", error);
          } else {
            console.log("Email scheduled:", info.response);

            try {
              await Email.findByIdAndDelete(_id);
              console.log("Email deleted from database");
            } catch (deleteError) {
              console.error("Error deleting email from database:", deleteError);
            }
          }
        }
      );
    });

    res.status(200).json({ message: "Emails scheduled successfully" });
  } catch (err) {
    console.error("Error scheduling emails:", err);
    res.status(500).json({ message: "Error scheduling emails" });
  }
};

// const sendRem = async (req, res) => {
//   try {
//     const reminders = await Email.find({
//       datetime: { $lte: new Date() },
//     }).sort({ datetime: 1 });
//     const currentTime = new Date();
//     for (const reminder of reminders) {
//       const timeDifference = reminder.datetime - currentTime;
//       if (timeDifference > 0) {
//         // Wait for the specified time before sending the reminder
//         setTimeout(async () => {
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: "syednaqvi1881@gmail.com",
//               pass: "npgt text pkjr isih",
//             },
//           });
//           await transporter.sendMail({
//             from: "syednaqvi1881@gmail.com",
//             to: reminder.email,
//             subject: "Reminder",
//             text: reminder.message,
//           });
//           console.log(
//             `Reminder sent to ${reminder.email} at ${reminder.datetime}`
//           );
//           await reminder.remove();
//         }, timeDifference);
//       } else {
//         // Send the reminder immediately if the time difference is less than or equal to 0
//         const transporter = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "syednaqvi1881@gmail.com",
//             pass: "npgt text pkjr isih",
//           },
//         });
//         await transporter.sendMail({
//           from: "syednaqvi1881@gmail.com",
//           to: reminder.email,
//           subject: "Reminder",
//           text: reminder.message,
//         });
//         console.log(
//           `Reminder sent to ${reminder.email} at ${reminder.datetime}`
//         );
//         await reminder.remove();
//       }
//     }
//   } catch (error) {
//     throw new Error("SendRem failed", 400);
//   }
//   res.send("Reminders sent");
// };

exports.createRem = createRem;
exports.sendRem = sendRem;
