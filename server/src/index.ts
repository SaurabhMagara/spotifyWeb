import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/all.routes";
import { origin, port } from "./utils/getEnv";

const app = express();

//Allow access origin for requesting from frontend
app.use(cors({
    origin:`${origin}`,
    credentials: true
}));

//for using json data
app.use(express.json());

//for sending cookies
app.use(cookieParser());

app.use("/api/v1", allRoutes);

app.listen(port || 5001,()=>{
    console.log("Port is running :", port);
});
