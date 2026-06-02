const Listing = require("../models/listing");
const Review = require("../models/review.js");
const ExpressError=require("../utils/ExpressErrors.js");
const {listingSchema,reviewSchema}=require("../schema.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","please login first");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    console.log("CRITICAL DEBUG:", req.originalUrl);
}
next()
}

module.exports.isOwner=async(req,res,next)=>{
let {id}=req.params;
let listing=await Listing.findById(id);
if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you dont have the permission for the task");
    return res.redirect(`/listing/${id}`);
}
next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body); 
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

module.exports.validaterReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body); 
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author");
        return res.redirect(`/listing/${id}`);
    }
    next();
    };