import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import sendPushNotification from "../../Notifications/sendPushNotification";

const ApplyJobs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const OnformSubmit = async () => {
    if (name === "") {
      alert("Please fill the name first");
    } else {
      try {
        await sendPushNotification(
          "Your job application has been submitted successfully!"
        );
        navigate("/Jobs");
      } catch (error) {
        console.error("Error submitting job application:", error);
        alert("Failed to apply for job. Please try again later.");
      }
    }
  };

  return (
    <div className="apply-job">
      <div className="container">
        <header className="header">
          <h1 className="post-job">Fill the form </h1>
        </header>
        <form>
          <div className="form-group">
            <label id="name-label" for="name">
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Your Resume</label>
            <label>
              <input type="file" id="myFile" name="filename" required />
            </label>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              onClick={OnformSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobs;
