const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const { insertMany } = require("../models/listing.js");

let mongoose_url="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connectd to db");
}).catch((err)=>{
    console.log(err)
});

async function main() {
    await mongoose.connect(mongoose_url);
}
const initDB=async()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,owner:'6a196f8bbaa43b2816c920b8'}))
    await Listing.insertMany(initdata.data);
    console.log("data was saved in db");
}
initDB();