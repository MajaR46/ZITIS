import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

// TODO: For frontend team, add a button to edit the profile, and a button to delete the profile. For backend team, connect with neccessary routes to update and delete the profile. Include authentication token or session data for the user to be able to edit or delete their profile

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchMyUser = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3001/api/user/my-user`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="job-background">
        <div className="title">
          Hi, {user.role === "company" ? user.name : user.firstName}
        </div>
      </div>
      <div className="job-section">
        <div className="job-page">
          {user.role === "admin" ? (
            <div className="user-title">
              <h2>Admin Profile</h2>
              <p>Admins have special privileges.</p>
            </div>
          ) : user.role === "company" ? (
            <>
              <div className="user-title">
                <h2>Company Profile</h2>
              </div>
              <div className="profile-card-info">
                <div className="job-detail">
                  <h4>{user.name}</h4>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Location:</strong> {user.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {user.description}
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
                    {user.firstName} {user.lastName}
                  </h4>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Location:</strong> {user.location}
                  </p>
                  <p>
                    <strong>Bio:</strong> {user.bio}
                  </p>
                </div>
              </div>
              <div className="user-title">
                <h2>SKILLS</h2>
              </div>
              <div className="profile-cards">
                {user.skills.map((skill, index) => (
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