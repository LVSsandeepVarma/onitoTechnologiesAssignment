const mongoose=require("mongoose")
const Schema=mongoose.Schema

const testSchema= new Schema({
    name : {type:String, required:true},
})

const testModel=mongoose.model("tests",testSchema)

module.exports=testModel