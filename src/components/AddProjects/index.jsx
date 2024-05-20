import React, { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

// TODO: Delete the userId input field, get the user id of the logged-in user from authentication token or session data, make the necessary changes in the database to automatically assign the user id to the project, and include authentication token or session data

const AddProject = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    if (projectTitle === "" || projectDescription === "" || projectStatus === "" || uploadDate === "" || userId === "") {
      alert("All fields are required");
      return;
    }

    const projectData = {
      projectTitle,
      projectDescription,
      projectStatus,
      uploadDate,
      userId,
    };

    try {
      const response = await fetch("http://localhost:3001/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newProject = await response.json();

        // Save project data to localStorage
        let savedProjects = [];
        if (localStorage.getItem("projects")) {
          savedProjects = JSON.parse(localStorage.getItem("projects"));
        }
        localStorage.setItem(
          "projects",
          JSON.stringify([...savedProjects, newProject])
        );

        alert("Project Added Successfully");
        navigate("/projects");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("An error occurred while adding the project");
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
