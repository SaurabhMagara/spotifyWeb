import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/all.routes";

const app = express();

// Allow access origin for requests from frontend
app.use(cors({
<<<<<<< HEAD
    origin: process.env.ORIGIN,
=======
    origin: process.env.ORIGIN, // This is used to specify allowed CORS origin
>>>>>>> aba0418edfc2cf0adce52cbf9241522ea98684ba
    credentials: true
}));

// For using JSON data
app.use(express.json());

// For sending cookies
app.use(cookieParser());

// API Routes
// app.use("/api/v1", allRoutes);

<<<<<<< HEAD
app.listen(process.env.PORT || 5001,()=>{
    console.log("Port is running :", process.env.PORT);
});
=======
// Vercel assigns a port automatically, use process.env.PORT
// const port = process.env.PORT || 5001;
// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
app.get("/", (req :express.Request, res:express.Response) => {
    res.send("Hello from Vercel!");
});

export default app;
>>>>>>> aba0418edfc2cf0adce52cbf9241522ea98684ba
