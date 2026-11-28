//Defines the express app and all its configurations including all routed api files.
import express from "express";
import cors from "cors";
import Register from "./actions/register.js";
import multer from "multer";
import House from "./actions/house.js";
import ALl_Fetch from "./actions/fetch_all.js";
import { configDotenv } from "dotenv";
import UploadImage from "./actions/Upload.js";
configDotenv()
const app= express();
const config=cors({origin:[process.env.frontend_url,"http://localhost:5173"],methods:["POST","GET"],credentials:true});
const mult_config=multer({dest:"upload_folder/",limits:{files:3,fileSize:1024*1024*5}});
app.use(config);
app.use(express.json());
app.post("/api/register",Register);
app.post("/api/register_house",House);
app.post("/api/upload_house",mult_config.array('mmustimages',3),UploadImage);
app.get("/api/get_all",ALl_Fetch);
export default app;
