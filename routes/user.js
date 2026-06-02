const express=require("express");
const router = express.Router();
const user=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewares/middleware.js");
const userController=require("../controllers/users.js")

router
.route("/signup")
.get(userController.rendersignupform)
.post(wrapAsync(userController.signup));

router
.route("/login")
.get(userController.renderloginform)
.post(saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true,}),userController.login);

router.get("/logout",userController.logout);


module.exports=router;