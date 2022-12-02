const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router(); // creates router

router.route("/").get(reviewController.getAllReviews).post(
  authController.protect,
  // authController.restrictTo("User"),
  reviewController.createReview
);
router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(
    authController.protect,
    authController.restrictTo("Admin", "User"),
    reviewController.deleteReview
  );

module.exports = router;
