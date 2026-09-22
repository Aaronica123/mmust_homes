//Defines the express app and all its configurations including all routed api files.
import express from "express";
import cors from "cors";
import Register from "./actions/register.js";
const app= express();
const config=cors({origin:"",methods:["POST","GET"],credentials:true});
app.use(config);
app.use(express.json());
app.post("/api/register",Register);
export default app;
