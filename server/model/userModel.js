const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema= new Schema({
    name : {type:String, required:true},
    DOB: {type: String, required:true},
    gender: {type:String, required:true},
    mobile: {type:String},
    govtIDType:{type:String, enum:["Aadhar","Pan"]},
    govtId:{type:String},
    guardianType:{type:String},
    guardianName:{type:String},
    email:{type:String},
    emergencyContact:{type:Number},
    address:{type:String},
    state:{type:String},
    city:{type:String},
    country:{type:String},
    pincode:{type:Number},
    occupation:{type:String},
    religion:{type:String},
    maritialStatus:{type:String, enum:["Married", "Single"]},
    BloodGroup:{type:String},
    nationality:{type:String},
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel