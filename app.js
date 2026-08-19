if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError=require("./utils/ExpressErrors.js");
const session=require("express-session");
const MongoStore = require('connect-mongo').default;
const flash=require("connect-flash");
const passport=require("passport");
const LocalStartegy=require("passport-local");
const user=require("./models/user.js");
console.log(MongoStore);

const listingRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const cookie = require("express-session/session/cookie.js");

const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
console.log("connectd to db");
}).catch((err)=>{
console.log(err)
});
async function main() {
await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR in mongosession store",err);
})

const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
    expires: Date.now()+7*24*60*1000,
    maxAge:7*24*60*1000,
    httpOnly:true,
    },
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req,res,next) =>{
res.locals.success = req.flash("success");
res.locals.error = req.flash("error");
res.locals.currUser=req.user;
next();
});

app.use("/listing",listingRouter);
app.use("/listing/:id/review",reviewsRouter);
app.use("/",userRouter);

app.get("/",(req,res)=>{
    res.redirect("/listing")
})

app.listen(8080,(req,res)=>{
    console.log("port is active");
});

app.use((req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode =500,message="something went wrong"}=err;
    res.render("listing/error.ejs",{err});
    });

