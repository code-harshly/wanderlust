const { required } = require('joi');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose").default;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("user",userSchema);