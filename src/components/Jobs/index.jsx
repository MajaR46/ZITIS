import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import Filter from "../Filter";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchRoles();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/job");
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("There was an error fetching the jobs!", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/job/roles");
      setRoles(response.data);
    } catch (error) {
      console.error("There was an error fetching roles!", error);
    }
  };

  const handleJobFilter = async (role) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/job/role/${role}`);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("There was an error filtering jobs by role!", error);
    }
  };

  const saveClick = (job) => {
    window.localStorage.setItem("Job", JSON.stringify(job));
    setActive(!active);
  };

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (data !== "" || data.length > 2) {
      const filterData = jobs.filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(data.toLowerCase())
      );
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(jobs);
    }
  };

  const handleExperienceFilter = async (checkedState) => {
    const filters = checkedState.reduce((acc, isChecked, idx) => {
      if (isChecked) {
        const { min, max } = experience[idx];
        acc.push(`${min}-${max}`);
      }
      return acc;
    }, []);

    if (filters.length === 0) {
      setFilteredJobs(jobs);
      return;
    }

    try {
      const results = await Promise.all(filters.map(filter =>
        axios.get(`http://localhost:3001/api/job/experience/${filter}`)
      ));
      const filteredJobs = results.flatMap(result => result.data);
      setFilteredJobs(filteredJobs);
    } catch (error) {
      console.error("There was an error filtering jobs by experience!", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Our Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(
              ({ _id, company, position, location, posted, role }) => (
                <div key={_id} className="job-list">
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
                      <div className="job-posting">
                        <Link to="/apply-jobs">Apply Now</Link>
                      </div>
                      <div className="save-button">
                        <Link
                          to="/Jobs"
                          onClick={() => {
                            saveClick({ _id, company, position, location, posted });
                          }}
                        >
                          {JSON.parse(localStorage.getItem("Job"))?._id === _id ? (
                            <AiFillHeart />
                          ) : (
                            <AiOutlineHeart />
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <Filter
            roles={roles}
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
