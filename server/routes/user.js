const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const testModel = require("../model/testModel")
const userModel = require("../model/userModel")


router.get("/",(req,res)=>{
    return res.status(200).send({data:"successfully routed!!"})
})

router.post("/register", (req,res)=>{
    console.log(req.body)
    if(req.body.name != "" && req.body.DOB !="" && req.body.gender !=""){
        const userData = {...req.body}
        userModel.create(userData).then(()=>{
            console.log(userData)
            res.status(200).send({data:"stored successfully"})
        }).catch((err)=>{
            res.status(400).send({data:err})
        })

    }
    else{
        res.status(400).send({data: "please fill all the mandatory fields"})
    }
})

router.post("/test",async (req,res)=>{
    console.log(req.body)
    await testModel.create({
        name: req.body.name
    })
    res.status(200).send("successful")
})

router.get("/registers", async (req,res)=>{
    const registersData = await userModel.find()
    console.log(registersData)
    res.status(200).send({data:registersData})
})
module.exports = router