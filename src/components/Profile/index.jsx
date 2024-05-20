import React from "react";
import Navbar from "../Navbar";
import "./index.css";

// TODO: For frontend team, add a button to edit the profile, and a button to delete the profile. For backend team, connect with neccessary routes to update and delete the profile. Include authentication token or session data for the user to be able to edit or delete their profile

const Profile = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  if (!loggedInUser) {
    window.location.href = "/login";
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="job-background">
        <div className="title">
          Hi,{" "}
          {loggedInUser.role === "company"
            ? loggedInUser.name
            : loggedInUser.firstName}
        </div>
      </div>
      <div className="job-section">
        <div className="job-page">
          {loggedInUser.role === "admin" ? (
            <div className="user-title">
              <h2>Admin Profile</h2>
              <p>Admins have special privileges.</p>
            </div>
          ) : loggedInUser.role === "company" ? (
            <>
              <div className="user-title">
                <h2>Company Profile</h2>
              </div>
              <div className="profile-card-info">
                <div className="job-detail">
                  <h4>{loggedInUser.name}</h4>
                  <p>
                    <strong>Email:</strong> {loggedInUser.email}
                  </p>
                  <p>
                    <strong>Location:</strong> {loggedInUser.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {loggedInUser.description}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="user-title">
                <h2>BASIC INFORMATION</h2>
              </div>
              <div className="profile-card-info">
                <div className="job-detail">
                  <h4>
                    {loggedInUser.firstName} {loggedInUser.lastName}
                  </h4>
                  <p>
                    <strong>Email:</strong> {loggedInUser.email}
                  </p>
                  <p>
                    <strong>Location:</strong> {loggedInUser.location}
                  </p>
                  <p>
                    <strong>Bio:</strong> {loggedInUser.bio}
                  </p>
                </div>
              </div>
              <div className="user-title">
                <h2>SKILLS</h2>
              </div>
              <div className="profile-cards">
                {loggedInUser.skills.map((skill, index) => (
                  <div className="profile-card" key={index}>
                    <div className="job-detail">
                      <h4>{skill}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>{" "}
          {/* Logout button */}
        </div>
      </div>
    </>
  );
};

export default Profile;
