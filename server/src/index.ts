import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/all.routes";

const app = express();

// Allow access origin for requests from frontend
app.use(cors({
    origin:[process.env.ORIGIN || "https://spotifyweb-seven.vercel.app"], // This is used to specify allowed CORS origin
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// For using JSON data
app.use(express.json());

// For sending cookies
app.use(cookieParser());


app.get("/", (req, res)=>{
    res.json({message : "hello"});
})
// API Routes
app.use('/api/v1', allRoutes);


app.listen(process.env.PORT || 5001,()=>{
    console.log("Port is running :", process.env.PORT);
});

export default app;