import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";
import EditProject from "../EditProject/EditProject";
import ConfirmModal from "../modals/ConfirmModal";
import CancelButton from "../buttons/CancelButton";
import PrimaryButton from "../buttons/PrimaryButton";

const MyProjects = () => {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const fetchMyProjects = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/project/user/project`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  const handleUpdateProject = async (projectId, formData) => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/project/${projectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedProject = await response.json();
      setFilteredProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/project/${projectToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setFilteredProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectToDelete)
      );
      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const confirmDelete = (projectId) => {
    setShowDeleteModal(true);
    setProjectToDelete(projectId);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const proceedDelete = () => {
    handleDeleteProject();
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

              return isEditing === id ? (
                <EditProject
                  key={id}
                  project={project}
                  onSave={handleUpdateProject}
                  onCancel={() => setIsEditing(null)}
                />
              ) : (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <div className="job-detail">
                        <h4>{projectTitle}</h4>
                        <p>{projectDescription}</p>
                        <div className="category">
                          <p>Status: {projectStatus}</p>
                          <p>
                            Uploaded:{" "}
                            {new Date(uploadDate).toLocaleDateString()}
                          </p>
                          <p>User ID: {userId}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-button">
                      <PrimaryButton
                        text="Edit Project"
                        onClick={() => setIsEditing(id)}
                      />

                      <CancelButton
                        text="Delete Project"
                        onClick={() => confirmDelete(id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showDeleteModal}
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={proceedDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default MyProjects;
