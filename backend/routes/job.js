const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getAllJobs);
router.get('/experience/:experience', jobController.getJobByExperience);
router.get('/role/:role', jobController.getJobByRole);
router.get('/roles', jobController.getDistinctRoles);
router.get('/:id', jobController.getJobById);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
