import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import allRoutes from "./routes/routes.all";
import { port } from "./utils/getEnv";

const app = express();

//Allow access origin
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

//for using json data
app.use(express.json());
app.use("/api/v1", allRoutes);

app.listen(port || 5001,()=>{
    console.log("Port is running :", port);
});
