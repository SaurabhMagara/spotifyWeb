import { Link } from "react-router";
import React from "react";
import axios from "axios";

const Home = () => {

    const getToken = async () => {

        try {
            const res = await axios.get("/api/v1/token",{withCredentials : true});
            console.log(res);
        } catch (error) {
            console.log("error while getting access token : ", error);
        }
    }

    React.useEffect(() => {

        getToken();

       // making interval for generating token before its expiry
       const interval = setInterval(()=>{
        console.log("refreshing token...");
        getToken();
       }, 55*60*1000);

       return ()=> clearInterval(interval);

    }, []);

    return (
        <>
            <div className="flex justify-center items-center h-screen w-screen gap-3 flex-col bg-gradient-to-b from-gray-800 to-black subpixel-antialiased">
                <div className="h-2/6 gap-3 w-11/12 flex flex-col justify-center items-center">
                    <h1 className="font-bold text-5xl text-green-600 text-center p-2 ">Spotify Web</h1>
                    <p className="text-gray-200 text-lg text-wrap text-center w-4/6"> Welcome to Spotify web. Here you can find albums, tracks and many more about songs. This platform direct you to spotify to discover more. </p>
                    <Link to='/explore'>
                        <button className="text-gray-200 border rounded-3xl px-4 py-2 text-lg hover:bg-green-600 hover:border-0 transition-all"> Get Started </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;