const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middlewares/authentication');

router.get('/', jobController.getAllJobs);
router.get('/experience/:experience', jobController.getJobByExperience);
router.get('/role/:role', jobController.getJobByRole);
router.get('/roles', jobController.getDistinctRoles);
router.get('/:id', jobController.getJobById);
router.post('/', authMiddleware, jobController.createJob);
router.put('/:id', authMiddleware, jobController.updateJob);
router.delete('/:id', authMiddleware, jobController.deleteJob);
router.post('/notify', authMiddleware, jobController.sendNotification)
router.get('/user/my-jobs', authMiddleware, jobController.getUsersJobs)

module.exports = router;
