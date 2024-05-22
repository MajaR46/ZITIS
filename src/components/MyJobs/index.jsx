import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import JobData from "./../../Assets/jobs.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MyJobs = () => {
  const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const [filteredJobs, setFilteredJobs] = useState(savedJobs);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      const userJobs = JobData.filter(
        (job) => job.userId === user._id
      );
      setFilteredJobs(userJobs);
    }
  }, []);

  const [active, setActive] = useState(false);

  function saveJob(
    id,
    company,
    position,
    role,
    level,
    experience,
    salary,
    location,
    posted,
    __v
  ) {
    const jobData = {
      id,
      company,
      position,
      role,
      level,
      experience,
      salary,
      location,
      posted,
      __v
    };

    window.localStorage.setItem("SavedJob", JSON.stringify(jobData));
    console.log(jobData);
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>My Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(
              ({
                id,
                company,
                position,
                role,
                level,
                experience,
                salary,
                location,
                posted,
                __v
              }) => {
                return (
                  <div className="job-list" key={id}>
                    <div className="job-card">
                      <div className="job-name">
                        <div className="job-detail">
                          <h4>{company}</h4>
                          <p>{position}</p>
                          <div className="category">
                            <p>Location: {location}</p>
                            <p>Role: {role}</p>
                            <p>Level: {level}</p>
                            <p>Experience: {experience}</p>
                            <p>Salary: {salary}</p>
                            <p>Posted: {posted}</p>

                          </div>
                        </div>
                      </div>
                      <div className="job-button">
                        <div className="job-posting">
                          <Link to="/send-inquiry">View job</Link>
                        </div>
                        <div className="save-button">
                          <Link
                            to="/Jobs"
                            onClick={() => {
                              saveJob(
                                id,
                                company,
                                position,
                                role,
                                level,
                                experience,
                                salary,
                                location,
                                posted,
                                __v
                              );
                              setActive(!active);
                            }}
                          >
                            {JSON.parse(localStorage.getItem("Job"))?.id ===
                              id ? (
                              <AiFillHeart />
                            ) : (
                              <AiOutlineHeart />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyJobs;
