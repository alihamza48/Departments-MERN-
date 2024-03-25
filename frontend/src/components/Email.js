// ReminderForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReminderForm = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [emails, setEmails] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/email/reminder", {
        method: "POST",
        body: JSON.stringify({ email, date, time, message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to schedule email");
      }
      alert("Email scheduled successfully");
      navigation("/users/dept");
    } catch (error) {
      console.error("Error scheduling email:", error);
      alert("Failed to schedule email" + { error });
    }
    //---------------------------------------------------------------------------------
  };

  useEffect(() => {
    const fetchScheduledEmails = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/email/reminder"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch scheduled emails");
        }
        const data = await response.json();
        console.log(data);
        setEmails(data.emails); // Update state with fetched emails
      } catch (error) {
        console.error(error);
      }
    };

    fetchScheduledEmails();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center ">
        <form
          className="text-black-500 text-center flex flex-col shadow-2xl border border-gray-600 rounded-md
         mt-20 w-72 "
          onSubmit={handleSubmit}
        >
          <label className="p-2 font-bold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black-300 p-2"
          />
          <label className="p-2 font-bold">Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-black-300 p-2"
          />
          <label className="p-2 font-bold">Time</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-black-300 p-2"
          />
          <label className="p-2 font-bold">Message</label>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-black-300 p-2"
          />
          <button
            className="border m-2 border-black p-2 font-bold hover:bg-gray-200"
            type="submit"
          >
            Schedule Email
          </button>
        </form>
      </div>
      {/* <div>
        <h2>Scheduled Emails</h2>
        <ul>
          {emails?.map((email, index) => (
            <li key={index}>
              <strong>Email:</strong> {email.email}, <strong>Date:</strong>{" "}
              {email.date}, <strong>Time:</strong> {email.time},{" "}
              <strong>Message:</strong> {email.message}
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default ReminderForm;
