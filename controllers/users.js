const user=require("../models/user.js");

module.exports.rendersignupform=(req,res)=>{
    res.render("listing/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
   let {username,email,password}=req.body;
   const newUser = new user({email,username});
 const registeredUser = await user.register(newUser,password);
 req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","you are LoggedIn now");
    res.redirect("/listing");
});
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderloginform=(req,res)=>{
    res.render("listing/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","welcomeback to wanderlust");
    let redirectulr=res.locals.redirectUrl || "/listing";
    res.redirect(redirectulr);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are LoggedOut now");
        res.redirect("/listing");
    })
}