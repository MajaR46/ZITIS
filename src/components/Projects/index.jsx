import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import ProjectData from "./../../Assets/projects.json";
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ProjectFilter from "../ProjectFilter";

const ProjectCard = ({
  id,
  projectTitle,
  projectDescription,
  projectStatus,
  uploadDate,
  userId,
  __v,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  const addComment = () => {
    const commenterName = loggedInUser ? `${loggedInUser.firstName} ${loggedInUser.lastName}` : "Anonymous";
    const newComment = {
      id: Date.now(),
      user: commenterName,
      text: comment,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  const deleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const editComment = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.text);
      setEditCommentId(commentId);
      setShowCommentBox(true);
    }
  };

  const updateComment = () => {
    const updatedComments = comments.map(comment => {
      if (comment.id === editCommentId) {
        return { ...comment, text: comment };
      }
      return comment;
    });
    setComments(updatedComments);
    setComment("");
    setEditCommentId(null);
    setShowCommentBox(false);
  };

  return (
    <div className="job-list" key={id}>
      <div className="job-card">
        <div className="job-name">
          <div className="job-detail">
            <h4>{projectTitle}</h4>
            <p>{projectDescription}</p>
            <div className="category">
              <p>Status: {projectStatus}</p>
              <p>Uploaded: {uploadDate}</p>
              <p>User ID: {userId}</p>
            </div>
          </div>
        </div>
        <div className="job-button">
          <div className="job-posting">
            <Link to="/send-inquiry">View project</Link>
          </div>
          <div className="save-button">
            <Link to="/Projects">
              {JSON.parse(localStorage.getItem("Job"))?.id === id ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </Link>
          </div>
        </div>
      </div>
      <div className="comment-section">
        {/* Show the textarea only if showCommentBox is true */}
        {showCommentBox && (
          <>
            <textarea className="commentBox"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={addComment}>Add Comment</button>
          </>
        )}
        {/* Button to toggle the display of the textarea */}
        <button className="addComment" onClick={() => setShowCommentBox(!showCommentBox)}>
          {showCommentBox ? "Hide Comment" : "Add a Comment"}
        </button>
        {/* Display comments */}
        <div className="comments">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.user}</strong>: {comment.text}
              </p>
              <div className="comment-actions">
                <button onClick={() => editComment(comment.id)}><AiOutlineEdit /></button>
                <button onClick={() => deleteComment(comment.id)}><AiOutlineDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
  const [filteredProjects, setFilteredProjects] = useState([
    ...savedProjects,
    ...ProjectData,
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (searchTerm !== "" || searchTerm.length > 2) {
      const filterData = ProjectData.filter((project) => {
        if (project) {
          return Object.values(project)
            .join("")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        } else {
          return 0;
        }
      });
      setFilteredProjects(filterData);
    } else {
      setFilteredProjects(ProjectData);
    }
  };

  function handleStatusFilter(selectedStatus) {
    if (selectedStatus.length === 0 || selectedStatus.includes("All")) {
      setFilteredProjects(ProjectData);
      return;
    }
    const filtered = ProjectData.filter((project) =>
      selectedStatus.includes(project.projectStatus)
    );
    setFilteredProjects(filtered);
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Discover Projects</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <ProjectFilter
            handleStatusFilter={handleStatusFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Projects;
