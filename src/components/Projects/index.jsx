import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ProjectFilter from "../ProjectFilter";

//TODO: fix the part with the comments/reviws

const ProjectCard = ({
  id,
  projectTitle,
  projectDescription,
  projectStatus,
  uploadDate,
  userId,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/review/project/${id}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);  // Initialize as an empty array in case of error
    }
  };

  const addComment = async () => {
    if (!loggedInUser) {
      console.error("User not logged in");
      alert("You must be logged in to add a comment.");
      return;
    }

    const commenterName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    const newComment = {
      comment,
      userId: loggedInUser.id,
      projectId: id,
    };

    try {
      const response = await fetch("http://localhost:3001/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        const createdComment = await response.json();
        setComments([...comments, createdComment]);
        setComment("");
      } else {
        const errorData = await response.json();
        console.error("Error adding comment:", errorData);
        alert("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/review/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        const errorData = await response.json();
        console.error("Error deleting comment:", errorData);
        alert("Failed to delete comment. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };


  const editComment = (commentId) => {
    const commentToEdit = comments.find(comment => comment._id === commentId);
    if (commentToEdit) {
      setComment(commentToEdit.comment);
      setEditCommentId(commentId);
      setShowCommentBox(true);
    }
  };

  const updateComment = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/review/${editCommentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      if (response.ok) {
        setComments(comments.map(comment => (comment._id === editCommentId ? { ...comment, comment } : comment)));
        setComment("");
        setEditCommentId(null);
        setShowCommentBox(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating comment:", errorData);
        alert("Failed to update comment. Please try again.");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment. Please try again.");
    }
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
        {showCommentBox && (
          <>
            <textarea
              className="commentBox"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={editCommentId ? updateComment : addComment}>
              {editCommentId ? "Update Comment" : "Add Comment"}
            </button>
          </>
        )}
        <button className="addComment" onClick={() => setShowCommentBox(!showCommentBox)}>
          {showCommentBox ? "Hide Comment" : "Add a Comment"}
        </button>
        <div className="comments">
          {Array.isArray(comments) && comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.userId}</strong>: {comment.comment}
              </p>
              <div className="comment-actions">
                <button onClick={() => editComment(comment._id)}><AiOutlineEdit /></button>
                <button onClick={() => deleteComment(comment._id)}><AiOutlineDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, [selectedStatus]);

  const fetchProjects = async () => {
    let url = "http://localhost:3001/api/project";

    if (selectedStatus.length && !selectedStatus.includes("All")) {
      url = `http://localhost:3001/api/project/status/${selectedStatus.join(",")}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const fetchProjectsByTitle = async () => {
    if (searchTerm.length < 3) {
      fetchProjects();
      return;
    }

    try {
      const url = `http://localhost:3001/api/project/title/${searchTerm}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.status === 404) {
        console.log("No projects found with the given title.");
        setProjects([]); // Set to empty array if no projects are found
      } else {
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects by title:", error);
      setProjects([]); // Set to empty array in case of error
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const searchEvent = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      fetchProjectsByTitle();
    } else {
      fetchProjects();
    }
  }, [searchTerm]);

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
            {Array.isArray(projects) && projects.map((project) => (
              <ProjectCard key={project._id} {...project} />
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