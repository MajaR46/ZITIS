import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Navbar from "../Navbar";
import { displayInAppNotification } from "../Notifications/sendAppNotifications";
import useSpeech from "../../hooks/speech";

const Home = () => {
  const [notificationDisplayed, setNotificationDisplayed] = useState(false);

  const commands = {
    "go to jobs": () => {
      const jobsButton = document.getElementById("jobs-button");
      if (jobsButton) {
        jobsButton.click();
      } else {
        console.error("Button not found: 'jobs-button'");
      }
    },
    "go to projects": () => {
      const projectsButton = document.getElementById("projects-button");
      if (projectsButton) {
        projectsButton.click();
      } else {
        console.error("Button not found: 'projects-button")
      }
    }
  };

  useSpeech(commands);

  useEffect(() => {
    if (!notificationDisplayed) {
      displayInAppNotification("Tip", {
        body: "use 'D' for scrolling down the page, and 'U' for scrolling up the page",
      });
      setNotificationDisplayed(true);
    }
  }, [notificationDisplayed]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "d" || event.key === "D") {
        window.scrollTo({
          top: window.scrollY + 200,
          behavior: "smooth",
        });
      } else if (event.key === "u" || event.key === "U") {
        window.scrollTo({
          top: window.scrollY - 200,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <h3>
            Find the <span>Right Job</span> In the
            <br />
            <span> Right Companies</span>
          </h3>
          <div className="small-tagline">
            <p>Got fired? Get Ready to be hired</p>
          </div>
        </div>
        <Link to="/Jobs" className="button" data-testid="btn" id="jobs-button">
          <span>Browse Jobs</span>
        </Link>
        <br></br> <br></br>
        <Link to="/projects" className="button" data-testid="btn" id="projects-button">
          <span>View projects</span>
        </Link>

      </div>
      <div className="social-media" data-testid="images">
        <img
          src="https://assets.website-files.com/5ec5d86528da2f24250d634c/5ec7175d7e0c401a3e668a1d_facebook-logo.svg"
          alt="fb"
        />
        <img
          src="https://assets.website-files.com/5ec5d86528da2f24250d634c/5ec7175d68c9b0a57ed94925_google-logo.svg"
          alt="google"
        />
        <img
          src="https://assets.website-files.com/5ec5d86528da2f24250d634c/601e13bc333df3521cce5b6a_youtube-logo-jobs-webflow-template.svg"
          alt="youtube"
        />
        <img
          src="https://assets.website-files.com/5ec5d86528da2f24250d634c/601e13bc774d5a00bcbb0baf_linkedin-logo-jobs-webflow-template.svg"
          alt="linkedin"
        />
      </div>
    </>
  );
};

export default Home;
