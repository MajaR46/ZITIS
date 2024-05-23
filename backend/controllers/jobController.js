const Job = require('../models/Job');
const User = require('../models/User');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobByExperience = async (req, res) => {
  try {
    const [minExperience, maxExperience] = req.params.experience.split('-').map(Number);

    if (isNaN(minExperience) || isNaN(maxExperience)) {
      return res.status(400).json({ message: 'Invalid experience range' });
    }

    const jobs = await Job.find({
      experience: { $gte: minExperience, $lte: maxExperience }
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobByRole = async (req, res) => {
  try {
    const role = req.params.role;

    const jobs = await Job.find({ role: role });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDistinctRoles = async (req, res) => {
  try {
    const roles = await Job.distinct('role');
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = new Job({ userId: req.params.userId, ...req.body });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendNotification = async (req, res) => {
  try {
    const { sub: sendingUserId } = req.user;
    const { jobId, userId: receivingUserId } = req.body;

    if (!sendingUserId || !jobId || !receivingUserId) {
      return res.status(400).json({ message: 'User ID and Job ID are required.' });
    }

    const [job, sendingUser, receivingUser] = await Promise.all([
      Job.findById(jobId),
      User.findById(sendingUserId),
      User.findById(receivingUserId)
    ]);

    if (!job || !sendingUser || !receivingUser) {
      return res.status(404).json({ message: `${!job ? 'Job' : !sendingUser ? 'Sending user' : 'Receiving user'} not found.` });
    }

    receivingUser.notifications.push(`${sendingUser.firstName} ${sendingUser.lastName} is interested in your posted job: ${job.company} ${job.position} ${job.role}`);
    await receivingUser.save();

    res.json({ message: 'Notification sent successfully.' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'An error occurred while sending the notification. Please try again later.' });
  }
};

exports.getUsersJobs = async (req, res) => {
  try {
      const userId = req.user.sub;
      console.log(userId);
      const jobs = await Job.find({ userId: userId });
      res.json(jobs);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};