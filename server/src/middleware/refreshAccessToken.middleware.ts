import express from "express";
import axios from "axios";

//middlerware for refreshing access token
export const refreshAccessToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        //getting token from cookies
        const {token} = req.cookies; //conditional check

        //if there is token then call next
        if (token) {
            return next();
        }
        // if there is not token then 
        // using URLSearchParams for giving url encoded form data

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', process.env.CLIENT_ID || '');
        params.append('client_secret', process.env.CLIENT_SECRET || '');

        const response = await axios.post("https://accounts.spotify.com/api/token", params,
                {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log("resfreshing token...");


        //sending response
        res
            .status(200)
            .cookie("token", response.data.access_token, { 
                httpOnly: true, 
                maxAge: 58 * 60 * 1000,
                secure : true,
                sameSite : "none",
                domain : ".vercel.app"
            }) // max age defines expiry
            .json({ message: "token refreshed", AccessToken: token });

        //store token in request for this request cycle
        req.cookies.token = response.data.access_token;

        return next();
    } catch (error) {
        console.log(error);
        // if res dosent send header then gives error 
        res.status(500).json({ message: "refreshAccessToken middleware error", error });
    }
}