import express from "express";
import mongoose from "mongoose";
import dotenv from"dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import HoldingsModel from "./models/HoldingsModel.js";
import PositionsModel from "./models/PositionsModel.js";
import OrderModel from "./models/OrderModel.js";
import userModel from "./models/userModel.js";
import {signupValidation ,loginValidation} from "./middilwares/AuthovAlidation.js";
import authentication from "./authentication.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();
const app=express();


const port=process.env.PORT || 3000;
const MONGO_URL =process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
async function main() {
  await mongoose.connect(MONGO_URL);
}
// app.get("/addHoldings",async (req,res)=>{
//    let data=[ {
//     name: "BHARTIARTL",
//     qty: 2,
//     avg: 538.05,
//     price: 541.15,
//     net: "+0.58%",
//     day: "+2.99%",
//   },
//   {
//     name: "HDFCBANK",
//     qty: 2,
//     avg: 1383.4,
//     price: 1522.35,
//     net: "+10.04%",
//     day: "+0.11%",
//   },
//   {
//     name: "HINDUNILVR",
//     qty: 1,
//     avg: 2335.85,
//     price: 2417.4,
//     net: "+3.49%",
//     day: "+0.21%",
//   },
//   {
//     name: "INFY",
//     qty: 1,
//     avg: 1350.5,
//     price: 1555.45,
//     net: "+15.18%",
//     day: "-1.60%",
//     isLoss: true,
//   },
//   {
//     name: "ITC",
//     qty: 5,
//     avg: 202.0,
//     price: 207.9,
//     net: "+2.92%",
//     day: "+0.80%",
//   },
//   {
//     name: "KPITTECH",
//     qty: 5,
//     avg: 250.3,
//     price: 266.45,
//     net: "+6.45%",
//     day: "+3.54%",
//   },
//   {
//     name: "M&M",
//     qty: 2,
//     avg: 809.9,
//     price: 779.8,
//     net: "-3.72%",
//     day: "-0.01%",
//     isLoss: true,
//   },
//   {
//     name: "RELIANCE",
//     qty: 1,
//     avg: 2193.7,
//     price: 2112.4,
//     net: "-3.71%",
//     day: "+1.44%",
//   },
//   {
//     name: "SBIN",
//     qty: 4,
//     avg: 324.35,
//     price: 430.2,
//     net: "+32.63%",
//     day: "-0.34%",
//     isLoss: true,
//   },
//   {
//     name: "SGBMAY29",
//     qty: 2,
//     avg: 4727.0,
//     price: 4719.0,
//     net: "-0.17%",
//     day: "+0.15%",
//   },
//   {
//     name: "TATAPOWER",
//     qty: 5,
//     avg: 104.2,
//     price: 124.15,
//     net: "+19.15%",
//     day: "-0.24%",
//     isLoss: true,
//   },
//   {
//     name: "TCS",
//     qty: 1,
//     avg: 3041.7,
//     price: 3194.8,
//     net: "+5.03%",
//     day: "-0.25%",
//     isLoss: true,
//   },
//   {
//     name: "WIPRO",
//     qty: 4,
//     avg: 489.3,
//     price: 577.75,
//     net: "+18.08%",
//     day: "+0.32%",
//   },
//  ];

//  data.forEach(async (item)=>{
//     let newHolding = new HoldingsModel({
//      name:item.name,
//     qty:item.qty,
//     avg:item.avg,
//     price:item.price,
//     net:item.net,
//     day:item.day,
  
//   })
//   await newHolding.save();
//   })  
//   res.send("holdings added");
// })
//app.get("/addPositions",async (req,res)=>{
//   let data = [
//      {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
//   ];
//   data.forEach(async (item)=>{
//     let newposition=new PositionsModel({
//      product:item.product,
//     name:item.name,
//     qty:item.qty,
//     avg:item.avg,
//     price:item.price,
//     net:item.net,
//     day:item.day,
//     isLoss:item.isLoss,
//     })
//     await newposition.save();
//   })
//   res.send("positions added");
// })
app.get("/allHoldings",  async (req, res)=>{
   let data=await HoldingsModel.find({});
   res.json(data);
});

app.get("/allPositions",  async (req, res)=>{
   let data=await PositionsModel.find({});
   res.json(data);
});
app.post("/newOrder", async (req, res)=>{
  let data= new OrderModel(
    {
    name:req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    mode:req.body.mode,
    });
  await data.save();
  res.send("order added");
});

app.get("/allOrders", async (req,res)=>{
   let data=await OrderModel.find({});
   res.json(data);
}); 

app.delete("/deleteOrder/:id",async (req,res)=>{
   let id=req.params.id;
   await OrderModel.findByIdAndDelete(id);
   res.send("order deleted");
});

app.post("/signup",signupValidation, async (req, res)=>{
  
  try {
   let data= new userModel(
    {
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
    });
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    data.password = await bcrypt.hash(data.password, 10); 
  await data.save();
res.status(201).json({
  success: true,
  message: "User added"
});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

app.post("/login",loginValidation, async (req, res)=>{
  try {
   let data= new userModel(
    {
    email:req.body.email,
    password:req.body.password
    });
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(403).json({ message: "Invalid user email or password" });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid user email or password" });
    }
    const jwtToken=jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      JWT_SECRET,
      { expiresIn: "24h"
      }
    )
  res.status(200).json({
  success: true,
  token: jwtToken,
  user: {
    name: existingUser.name,
    email: existingUser.email
  }
});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});
  
app.listen(port,()=>{
    console.log("your server is runing on 3000...");
})