import toast,{ Toaster } from "react-hot-toast";
import { useParams } from "react-router";
import Divider from "./Divider";
import { AlbumCard } from "./AlbumArtistNRPage";
import axios from "axios";
import React from "react";
import { Album } from "../types";
import { Bars } from "react-loader-spinner";

const CategoriesPage = () => {
    const { id } = useParams();
    const [data, setData] = React.useState<Album[]>([]);
    const [loading, setLoading] = React.useState(false);
    
    const getResponse = async () =>{
        setLoading(true);
        try {
            const res = await axios.post(`http://localhost:5000/api/v1//albums/${id}`,{},{withCredentials:true});
            setData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    }

    React.useEffect(()=>{
        getResponse();
    },[])

    return (
        <div className=" flex items-center min-h-screen w-screen flex-col gap-5 bg-gray-950 subpixel-antialiased overflow-y-hidden pb-4">
            <div>
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
            <div className="flex justify-between items-center w-3/4 px-5">
                <h1 className="text-gray-200 font-bold text-5xl text-center">
                    {id?.slice(1, id.length)}
                </h1>
            </div>

            <Divider />

           {loading?
           <div className="h-[600px] w-full flex justify-center items-center">
                <Bars
                   height="80"
                   width="80"
                   color="#4fa94d"
                   ariaLabel="bars-loading"
                   wrapperStyle={{}}
                   wrapperClass=""
                   visible={true}
                 /> </div>
                 : <div className="flex justify-evenly items-center flex-wrap gap-5 w-8/12 p-0 my-0">
                <div className="grid grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 text-gray-300 w-full h-full">
                    {
                        data.map((value)=>{
                            return <AlbumCard key={value.id} name={value.name} url={value.images[0].url} spotify={value.external_urls.spotify} tracks={value.total_tracks} />
                        })
                    }
                </div>
            </div>}
        </div>
    )
}

export default CategoriesPage;