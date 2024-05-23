const Project = require('../models/project');
const User = require('../models/User')

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProjectByTitle = async (req, res) => {
    const projectTitle = req.params.projectTitle;
    try {
        const projects = await Project.find({ projectTitle: { $regex: projectTitle, $options: 'i' } });
        if (projects.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProjectsByStatus = async (req, res) => {
    const projectStatus = req.params.projectStatus;
    try {
        const projects = await Project.find({ projectStatus: projectStatus });
        if (!projects.length) {
            return res.status(404).json({ message: 'No projects found with this status' });
        }
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProject = async (req, res) => {
    try {
        const newProject = new Project({ userId: req.params.userId, ...req.body });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsersProjects = async (req, res) => {
    try {
        const userId = req.user.sub;
        const projects = await Project.find({ userId: userId });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendNotification = async (req, res) => {
    try {
      const { sub: sendingUserId } = req.user;
      const { projectId, userId: receivingUserId } = req.body;
  
      if (!sendingUserId || !projectId || !receivingUserId) {
        return res.status(400).json({ message: 'User ID and project ID are required.' });
      }
  
      const [project, sendingUser, receivingUser] = await Promise.all([
        Project.findById(projectId),
        User.findById(sendingUserId),
        User.findById(receivingUserId)
      ]);
  
      if (!project || !sendingUser || !receivingUser) {
        return res.status(404).json({ message: `${!project ? 'project' : !sendingUser ? 'Sending user' : 'Receiving user'} not found.` });
      }
  
      receivingUser.notifications.push(`${sendingUser.firstName} ${sendingUser.lastName} is interested in your posted project: ${project.projectTitle} ${project.projectDescription}`);
      await receivingUser.save();
  
      res.json({ message: 'Notification sent successfully.' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ message: 'An error occurred while sending the notification. Please try again later.' });
    }
  };
