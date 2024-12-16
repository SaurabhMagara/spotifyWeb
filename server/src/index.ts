import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/all.routes";

const app = express();

// Allow access origin for requests from frontend
app.use(cors({
    origin: process.env.ORIGIN, // This is used to specify allowed CORS origin
    credentials: true
}));

// For using JSON data
app.use(express.json());

// For sending cookies
app.use(cookieParser());

// API Routes
// app.use("/api/v1", allRoutes);

// Vercel assigns a port automatically, use process.env.PORT
// const port = process.env.PORT || 5001;
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
app.get("/", (req :express.Request, res:express.Response) => {
    res.send("Hello from Vercel!");
});

export default app;