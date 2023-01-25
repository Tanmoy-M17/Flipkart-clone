require("dotenv").config();
const express = require("express");
const fast2sms = require("fast-two-sms");
// const { verifyToken } = require("../Middlewares/verifytoken");
const { RegisterModel } = require("../Models/register.model");
const { generateOTP } = require("../utils/otp.util");
const userrouter = express.Router();

//----------------Register A user-------------------

userrouter.post("/register", async (req, res) => {
  const { phone } = req.body;
  try {
    const phoneno = await RegisterModel.find({ phone });
    if (phoneno.length > 0) {
      res.send({ msg: "You are already Registered" });
    } else {
      const user = new RegisterModel({ phone });
      const otp = generateOTP(4);
      user.phoneOTP = otp;
      await user.save();
      // send otp to phone number
      const response = await fast2sms.sendMessage({
        authorization: process.env.FAST2SMS,
        message: `Your OTP is ${otp}`,
        numbers: [phone.toString()],
      });
      console.log(response);
      res.send({
        type: "success",
        message: "Account created OTP sended to mobile number",
        data: {
          userId: user._id,
        },
        Respose:response,
      });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

//---------------Login A User-------------------

userrouter.post("/login", async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await RegisterModel.find({ phone });
    if (user.length == 0) {
      res.send({ msg: "You are not registered please register" });
    } else {
      res.send({ msg: "Logged in" });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

module.exports = {
  userrouter,
};
