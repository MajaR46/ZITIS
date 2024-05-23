import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import JobData from "./../../Assets/jobs.json";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const MyJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [active, setActive] = useState(false);


  const fetchMyJobs = async () => {

    const token = sessionStorage.getItem("token");

    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      console.error("No user found in session storage");
      return;
    }

    const { _id: userId } = user;

    try {
      const response = await fetch(`http://localhost:3001/api/job/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Jobs:", data);
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching my jobs:", error);
      setFilteredJobs([]);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

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

                              setActive(!active);
                            }}
                          >

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
