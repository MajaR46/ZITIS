import React, { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmitButton = (e) => {
    e.preventDefault();
    const projectData = {
      projectTitle,
      projectDescription,
      projectStatus,
      uploadDate,
      userId,
    };
    if (projectTitle === "") {
      alert("Enter project title");
    } else if (projectDescription === "") {
      alert("Enter project description");
    } else if (projectStatus === "") {
      alert("Select project status");
    } else if (uploadDate === "") {
      alert("Enter upload date");
    } else if (userId === "") {
      alert("Enter user ID");
    } else {
      let savedProjects = [];
      if (localStorage.getItem("projects")) {
        savedProjects = JSON.parse(localStorage.getItem("projects"));
      }
      localStorage.setItem(
        "projects",
        JSON.stringify([...savedProjects, projectData])
      );
      alert("Project Added Successfully");
      navigate("/projects");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="job-background">
        <div className="title">
          <h2>Post a Project</h2>
        </div>
      </div>
      <div className="container">
        <header className="header">
          <h1 className="post-job">Fill the form </h1>
        </header>
        <form onSubmit={handleSubmitButton}>
          <div className="form-group">
            <label id="name-label" htmlFor="projectTitle">
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              className="form-control"
              value={projectTitle}
              placeholder="Enter Project Title"
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="projectDescription">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              className="form-control"
              value={projectDescription}
              placeholder="Enter Project Description"
              onChange={(e) => setProjectDescription(e.target.value)}
              required
              rows={6}
            />
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="projectStatus">
              Project Status
            </label>
            <select
              id="projectStatus"
              className="form-control"
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="uploadDate">
              Upload Date
            </label>
            <input
              type="date"
              id="uploadDate"
              className="form-control"
              value={uploadDate}
              onChange={(e) => setUploadDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label id="name-label" htmlFor="userId">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              className="form-control"
              value={userId}
              placeholder="Enter User ID"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
