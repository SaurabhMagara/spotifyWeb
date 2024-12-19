"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const client_id = process.env.CLIENT_SECRET;
const client_secret = process.env.CLIENT_SECRET;
//middlerware for refreshing access token
const refreshAccessToken = async (req, res, next) => {
    try {
        //getting token from cookies
        const token = req.cookies; //conditional check
        //if there is token then call next
        if (token) {
            return next();
        }
        // if there is not token then 
        // using URLSearchParams for giving url encoded form data
        const response = await axios_1.default.post("https://accounts.spotify.com/api/token", {
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log("resfreshing token...");
        //sending response
        res
            .status(200)
            .cookie("token", response.data.access_token, { httpOnly: true, maxAge: 58 * 60 * 1000 }) // max age defines expiry
            .json({ message: "token refreshed", AccessToken: token });
    }
    catch (error) {
        console.log(error);
        // if res dosent send header then gives error 
        res.status(500).json({ message: "refreshAccessToken middleware error", error });
    }
};
exports.refreshAccessToken = refreshAccessToken;
