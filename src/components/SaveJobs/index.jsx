import React from "react";
import Navbar from "../Navbar";
//TODO: Implement backend logic for saving jobs

const SaveJobs = () => {
  const jobsJSON = localStorage.getItem("Job");
  const jobs = jobsJSON ? [JSON.parse(jobsJSON)] : null;

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
            {jobs === null ? (
              <p>No saved jobs found.</p>
            ) : (
              jobs.map(({ logo, company, position, location, role }, index) => (
                <div className="job-list" key={index}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={require(`../../Assets/images/${logo}`)}
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
                    <div className="job-posting"></div>
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
