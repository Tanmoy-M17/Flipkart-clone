const mongoose=require("mongoose");

const regiserSchema=mongoose.Schema({
    phone:Number,
    phoneOTP:Number
},{
    versionKey:false
}
);

const RegisterModel=mongoose.model("user",regiserSchema);
module.exports={
    RegisterModel
}