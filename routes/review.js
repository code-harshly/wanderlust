const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressErrors.js");
const review = require("../models/review.js");
const Listing=require("../models/listing.js");
const{validaterReview,isLoggedIn,isReviewAuthor}=require(("../middlewares/middleware.js"));
const reviewController=require("../controllers/reviews.js");

router.post("/",validaterReview,isLoggedIn,wrapAsync(reviewController.post));

router.delete("/:reviewid",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.delete));

module.exports=router;