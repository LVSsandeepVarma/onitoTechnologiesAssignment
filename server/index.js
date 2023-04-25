const express = require("express")
const userApi=require("./routes/user")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
dotenv.config()
mongoose.connect(process.env.DB).then(()=>{console.log("connected to Database")}).catch((err)=>{console.log("unable to connect tot Database",err)})
app.use("/user", userApi)

app.listen(process.env.PORT,()=>{
    console.log("server listening on port",process.env.PORT)
})
