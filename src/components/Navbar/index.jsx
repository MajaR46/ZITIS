import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const fetchMyUser = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/user/my-user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched User:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchMyUser();
  }, []);

  const userRole = user ? user.role : null;

  return (
    <nav id="navbar">
      <h1 className="logo">
        MELT <span>Freelance</span>
      </h1>

      <ul>
        {/* Common menu items */}
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        {/* Conditionally render "Saved Jobs" menu item */}
        {userRole !== "company" && (
          <li>
            <Link to="/saved-job">Saved Job</Link>
          </li>
        )}
        <li>
          <Link to="/projects">Discover projects</Link>
        </li>

        {/* Conditional menu items based on user role */}
        {userRole === "admin" && (
          <>
            <li>
              <Link to="/add-projects">Add project</Link>
            </li>
            <li>
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </li>
          </>
        )}

        {/* Menu items only for logged-in users */}
        {user && (
          <li className="profile-dropdown">
            <Link to="/profile">Profile</Link>
            <div className="dropdown-content">
              <Link to="/profile">My Profile</Link>
              {userRole !== "company" && (
                <>
                  <Link to="/my-projects">My Projects</Link>
                  <Link to="/add-projects">Post a Project</Link>
                </>
              )}
              {userRole === "company" && (
                <>
                  <Link to="/my-jobs">My Jobs</Link>
                  <Link to="/post-job">Post a Job</Link>
                </>
              )}
            </div>
          </li>
        )}

        {/* Login menu item */}
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
