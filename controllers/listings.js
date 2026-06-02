const Listing=require("../models/listing.js");

module.exports.index = async(req,res)=>{
let alllisting= await Listing.find({})
res.render("listing/index.ejs",{alllisting});
};

module.exports.newroute=(req,res)=>{
res.render("listing/create.ejs");
};

module.exports.showroute=async(req,res)=>{
let{id}=req.params;
const list = await Listing.findById(id).populate({path:"review",populate:{path:"author"},}).populate("owner");
if(!list){
req.flash("error","lisitng unavailable");
return res.redirect("/listing");
}
res.render("listing/show.ejs",{list});
};

module.exports.createroute=async (req, res, next) => {
let url=req.file.path;
let filename=req.file.filename;    
const newlistadd = new Listing(req.body.listing);
newlistadd.owner=req.user._id;
newlistadd.image={url,filename};
await newlistadd.save();
console.log(newlistadd.location);
req.flash("success","New listing added");
res.redirect("/listing");
};

module.exports.editroute=async(req,res)=>{
let{id}=req.params;
const list = await Listing.findById(id);
if(!list){
req.flash("error","lisitng unavailable");
return res.redirect("/listing");
}
let orginalImageUrl=list.image.url;
orginalImageUrl=orginalImageUrl.replace("/upload","/upload/w_250");
res.render("listing/edit.ejs",{list,orginalImageUrl});
};

module.exports.updateroute=async(req,res)=>{
let{id}=req.params;
let listing= await Listing.findByIdAndUpdate(id,{...req.body.Listing});
if(typeof req.file !=="undefined"){
let url=req.file.path;
let filename=req.file.filename; 
listing.image={url,filename};
await listing.save();
}
req.flash("success","Updated successfully");
res.redirect(`/listing/${id}`);
};

module.exports.deleteroute=async(req,res)=>{
let{id}=req.params;
await Listing.findByIdAndDelete(id);
req.flash("success","Listing deleted");
res.redirect("/listing");
};