//Defines the express app and all its configurations including all routed api files.
import express from "express";
import cors from "cors";
import Register from "./actions/register.js";
import multer from "multer";
import House from "./actions/house.js";
const app= express();
const config=cors({origin:"http://localhost:5173",methods:["POST","GET"],credentials:true});
const mult_config=multer({dest:"upload_folder/",limits:{files:2,fileSize:1024*1024*5}});
app.use(config);
app.use(express.json());
app.post("/api/register",Register);
app.post("/api/register_house",mult_config.array('images',2),House);
export default app;
