const { required } = require('joi');
const mongoose=require("mongoose");
const review = require("./review.js");
const schema=mongoose.Schema;

const lisitingSchema=new schema({
    title:{
    type:String,
    require:true
    },
    description:{
        type:String,
    },
    image:{
    url:String,
    filename:String
    },
    price:{
        type:Number
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"review"
}],
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
}
});

lisitingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id : {$in : listing.review}});
    }
});

const Listing=mongoose.model("listing",lisitingSchema);
module.exports=Listing;