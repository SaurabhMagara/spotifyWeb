import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/all.routes";

const app = express();

//Allow access origin for requesting from frontend
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

//for using json data
app.use(express.json());

//for sending cookies
app.use(cookieParser());

app.use("/api/v1", allRoutes);

app.listen(process.env.PORT || 5001,()=>{
    console.log("Port is running :", process.env.PORT);
});