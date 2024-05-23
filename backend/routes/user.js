const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authentication');

router.post('/login', userController.login);
router.get('/', authMiddleware, userController.getAllUsers);
router.get('/my-user', authMiddleware, userController.getCurrentUser);
router.get('/:id', authMiddleware, userController.getUserById);
router.post('/', userController.createUser);
router.put('/', authMiddleware, userController.updateUser);
router.delete('/', authMiddleware, userController.deleteUser);
router.post('/savejob', authMiddleware, userController.saveJob);
router.post('/token/refreshtoken', authMiddleware, userController.refreshToken)

module.exports = router;
