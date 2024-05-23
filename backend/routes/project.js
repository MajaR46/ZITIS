const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
const authMiddleware = require('../middlewares/authentication');

router.get('/', projectController.getAllProjects);
router.get('/title/:projectTitle', projectController.getProjectByTitle);
router.get('/status/:projectStatus', projectController.getProjectsByStatus);
router.get('/:id', projectController.getProjectById);
router.post('/', authMiddleware, projectController.createProject);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);
router.get('/user/project', authMiddleware, projectController.getUsersProjects);
router.post('/notify', authMiddleware, projectController.sendNotification)

module.exports = router;
