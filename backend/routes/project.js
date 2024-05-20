const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')

router.get('/', projectController.getAllProjects);
router.get('/title/:projectTitle', projectController.getProjectByTitle);
router.get('/status/:projectStatus', projectController.getProjectsByStatus);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
