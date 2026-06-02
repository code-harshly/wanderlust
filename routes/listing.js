const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middlewares/middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(validateListing,isLoggedIn,upload.single('listing[image]'),wrapAsync(listingController.createroute));

router.get("/new",isLoggedIn,listingController.newroute);

router
.route("/:id")
.get(wrapAsync(listingController.showroute))
.put(isLoggedIn,isOwner,validateListing,upload.single('listing[image]'),wrapAsync(listingController.updateroute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteroute));


router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editroute));

module.exports=router;
