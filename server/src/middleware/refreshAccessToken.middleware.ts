import express from "express";
import axios from "axios";
import { client_id, client_secret } from "../utils/getEnv";

//middlerware for refreshing access token
export const refreshAccessToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        //getting token from cookies
        const token = req.cookies; //conditional check

        //if there is token then call next
        if (token) {
            return next();
        } else {
            // if there is not token then 
            // using URLSearchParams for giving url encoded form data
            const response = await axios.post("https://accounts.spotify.com/api/token", new URLSearchParams({
                grant_type: "client_credentials",
                client_id: client_id,
                client_secret: client_secret
            }).toString(),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            //sending response
            res
                .status(200)
                .cookie("token", response.data.access_token, { httpOnly:true, maxAge: 58 * 60 * 1000 }) // max age defines expiry
                .json({ message: "token refreshed", AccessToken: token });

        }
    } catch (error) {
        console.log(error);
        // if res dosent send header then gives error 
        res.status(500).json({ message: "refreshAccessToken middleware error", error });
    }
}