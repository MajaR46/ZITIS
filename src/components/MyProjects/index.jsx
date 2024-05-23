import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MyProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeStates, setActiveStates] = useState({});
  const navigate = useNavigate();


  const fetchMyProjects = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/project/user/project`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Projects:", data);
      setFilteredProjects(data);
    } catch (error) {
      console.error("Error fetching my projects:", error);
      setFilteredProjects([]);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleLikeToggle = (projectId) => {
    setActiveStates((prevStates) => ({
      ...prevStates,
      [projectId]: !prevStates[projectId],
    }));
  };

  const handleDeleteProject = async (projectId) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/project/${projectId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Remove the deleted project from the state
      setFilteredProjects(filteredProjects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEditProject = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>My Projects</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredProjects.map((project) => {
              const {
                _id: id,
                projectTitle,
                projectDescription,
                projectStatus,
                uploadDate,
                userId,
              } = project;
              return (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <div className="job-detail">
                        <h4>{projectTitle}</h4>
                        <p>{projectDescription}</p>
                        <div className="category">
                          <p>Status: {projectStatus}</p>
                          <p>Uploaded: {new Date(uploadDate).toLocaleDateString()}</p>
                          <p>User ID: {userId}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-button">
                      <div className="job-posting">
                        <Link to={`/project/${id}`}>View project</Link>
                      </div>
                      <div className="save-button" onClick={() => handleLikeToggle(id)}>
                        {activeStates[id] ? <AiFillHeart /> : <AiOutlineHeart />}
                      </div>
                    </div>
                    <div className="edit-delete-button">
                      <button onClick={() => handleEditProject(id)}>Edit project</button>
                    </div>
                    <div className="edit-delete-button">
                      <button onClick={() => handleDeleteProject(id)}>Delete</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
