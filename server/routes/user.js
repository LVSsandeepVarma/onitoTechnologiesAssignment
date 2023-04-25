const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


router.get("/",(req,res)=>{
    return res.status(200).send({data:"successfully routed!!"})
})

module.exports = router