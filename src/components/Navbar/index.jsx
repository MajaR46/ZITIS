import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  // Retrieve user role from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userRole = user ? user.role : null;

  return (
    <>
      <nav id="navbar">
        <h1 className="logo">
          MELT <span>Freeelance</span>
        </h1>

        <ul>
          {/* Common menu items */}
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          {userRole === "company" && (
            <>
              <li>
                <Link to="/post-job">Post Job</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/saved-job">Saved Job</Link>
          </li>
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
            <>
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
                </div>
              </li>
            </>
          )}
          {/* Login menu item */}
          {!user && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
