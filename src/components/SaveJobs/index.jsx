import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PrimaryButton from "../buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const SaveJobs = () => {
  const [likedJobs, setLikedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLikedJobs = JSON.parse(localStorage.getItem("LikedJobs")) || [];
    setLikedJobs(storedLikedJobs);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Saved Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {likedJobs.length === 0 ? (
              <p>No saved jobs found.</p>
            ) : (
              likedJobs.map(({ _id, company, position, location, role }) => (
                <div className="job-list" key={_id}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={require(`../../Assets/images/amazon.png`)}
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-button">
                      <PrimaryButton
                        text="Apply Now"
                        onClick={() => navigate("/apply-jobs")}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveJobs;
