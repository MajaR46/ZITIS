import React, { useState } from 'react';
import './index.css';
import users from "./../../Assets/users.json";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            alert("Login successful!");
            navigate("/Profile");
        } else {
            alert("Invalid email or password.");
        }
    };

    const handleRegister = () => {
        navigate("/registration");
    };

    return (
        <div className="login">
            <div className="container">
                <header className="header">
                    <h1 className="login-title">Login</h1>
                </header>
                <form onSubmit={handleSubmit}>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            className="form-control"
                            placeholder="Enter Your Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            type="submit"
                            className="submit-button"
                        >
                            Login
                        </button>
                        <p>Don't have an account?</p>
                        <button className="profile-button" onClick={handleRegister}>Register</button> { }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
