import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        bio: "",
        skills: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, location, bio, skills } = formData;
        if (!firstName || !lastName || !email || !location || !bio || !skills) {
            alert("Please fill in all fields.");
        } else {
            alert("Your registration has been submitted successfully.");
            navigate("/Home");
        }
    };

    return (
        <div className="apply-job">
            <div className="container">
                <header className="header">
                    <h1 className="post-job">Registration</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            className="form-control"
                            placeholder="Enter Your First Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            className="form-control"
                            placeholder="Enter Your Last Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            className="form-control"
                            placeholder="Enter Your Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            className="form-control"
                            placeholder="Enter Your Location"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            className="form-control"
                            placeholder="Enter Your Bio"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills">Skills (comma separated):</label>
                        <input
                            type="text"
                            id="skills"
                            name="skills"
                            value={formData.skills}
                            className="form-control"
                            placeholder="Enter Your Skills"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
