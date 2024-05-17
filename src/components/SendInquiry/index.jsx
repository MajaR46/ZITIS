import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const SendInquiry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formData.message === "") {
      alert("Please fill in the inquiry message first");
    } else {
      alert("Your inquiry has been sent successfully!");
      navigate("/projects");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="send-inquiry">
      <div className="container">
        <header className="header">
          <h1 className="post-job">Send Inquiry to view Project</h1>
        </header>
        <form onSubmit={onFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              className="form-control"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              className="form-control"
              placeholder="Enter your phone number"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              className="form-control"
              placeholder="Enter the subject of your inquiry"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              className="form-control"
              placeholder="Type your inquiry message here..."
              onChange={handleChange}
              required
              rows={6} // Increase the number of rows for a bigger text area
            />
          </div>
          <div className="form-group">
            <button type="submit" className="submit-button">
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendInquiry;
