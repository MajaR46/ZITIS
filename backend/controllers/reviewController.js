const Review = require('../models/Review');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByUserId = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for the user' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.getReviewsByProjectId = async (req, res) => {
    try {
        const reviews = await Review.find({ projectId: req.params.projectId });
        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this project' });
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.createReview = async (req, res) => {
    try {
        const { comment, userId, projectId } = req.body;
        const newReview = new Review({ comment, userId, projectId });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found for update' });
        }
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found for deletion' });
        }
        res.status(200).json({ message: 'Review deleted successfully', deletedReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
