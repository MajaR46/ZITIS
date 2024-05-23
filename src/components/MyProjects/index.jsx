import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


const MyProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [active, setActive] = useState(false);

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
                        <Link to="/send-inquiry">View project</Link>
                      </div>
                      <div className="save-button">
                        <Link
                          to="/Projects"
                          onClick={() => setActive(!active)}
                        >
                          {active ? <AiFillHeart /> : <AiOutlineHeart />}
                        </Link>
                      </div>
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
