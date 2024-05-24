import React, { useState } from "react";
import "./EditProject.css";
import SaveButton from "../../buttons/SaveButton";
import CancelButton from "../../buttons/CancelButton";

const EditProject = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    projectTitle: project.projectTitle || "",
    projectDescription: project.projectDescription || "",
    projectStatus: project.projectStatus || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(project._id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-project-form">
      <label>
        Project Title:
        <input
          type="text"
          name="projectTitle"
          value={formData.projectTitle}
          onChange={handleChange}
        />
      </label>
      <label>
        Project Description:
        <textarea
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Project Status:
        <select
          name="projectStatus"
          value={formData.projectStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </label>
      <div className="button-group">
        <SaveButton text="Save" />

        <CancelButton text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default EditProject;
