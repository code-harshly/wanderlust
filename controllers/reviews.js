const review = require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.post=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    newReview.author=req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review added");
    res.redirect(`/listing/${listing.id}`);
};

module.exports.delete=async(req,res)=>{
    let {id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await review.findByIdAndDelete(reviewid);
    req.flash("success","Review Deleted");
res.redirect(`/listing/${id}`);
};