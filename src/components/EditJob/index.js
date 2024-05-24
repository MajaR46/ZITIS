import React, { useState } from "react";
import "./index.css";
import SaveButton from "../buttons/SaveButton";
import CancelButton from "../buttons/CancelButton";

const EditJob = ({ job, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    company: job.company || "",
    location: job.location || "",
    position: job.position || "",
    role: job.role || "",
    level: job.level || "",
    experience: job.experience || "",
    salary: job.salary || "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(job._id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-job-form">
      <label>
        Company Name:
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </label>
      <label>
        Job Location:
        <textarea
          name="location"
          value={formData.location}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Position:
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">Select position</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Devops">Devops</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>
      </label>
      <label>
        Job Role:
        <textarea
          name="role"
          value={formData.role}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Enter level:
        <textarea
          name="level"
          value={formData.level}
          onChange={handleChange}
        ></textarea>
      </label>

      <label>Salary
            <select
            name="salary"
            onChange={handleChange}
            value={formData.salary}
            >
              <option disabled selected value>
                Select Salary
              </option>
              <option value="0-15K">0-15K</option>
              <option value="15-30K">15-30K</option>
              <option value="30K-50K">30K-50K</option>
              <option value="50K-80K">50K-80K</option>
              <option value="80K+">80K+</option>
            </select>
            </label>
      <div className="button-group">
        <SaveButton text="Save" />

        <CancelButton text="Cancel" onClick={onCancel} />
      </div>
    </form>
  );
};

export default EditJob;
