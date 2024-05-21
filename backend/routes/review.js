const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authentication');

router.get('/', reviewController.getAllReviews);
router.get('/:id', authMiddleware, reviewController.getReviewById);
router.get('/user/:userId', authMiddleware, reviewController.getReviewsByUserId);
router.get('/project/:projectId', authMiddleware, reviewController.getReviewsByProjectId);
router.post('/', authMiddleware, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
