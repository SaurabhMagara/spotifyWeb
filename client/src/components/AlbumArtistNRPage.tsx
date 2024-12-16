import axios from "axios";
import React from "react";
import { GoSearch } from "react-icons/go";
import { Album, propData } from "../types";
import toast, { Toaster } from "react-hot-toast";
import Divider from "./Divider";
import { Bars } from 'react-loader-spinner'

const Albums = ({ passData }: { passData: string }) => {

  const [searchInput, setSearchInput] = React.useState('');
  const [data, setData] = React.useState<Album[]>();
  const [loading, setLoading] = React.useState(false);

  //Search handling
  const handleSearch = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (searchInput === "" || !searchInput) {
        setLoading(false);
        return toast.error("Type somethinng to search.", {
          duration: 2000, style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }

      const url = `${passData === "albums" ? `${import.meta.env.VITE_API_URL}/api/v1/` + passData + "/" + searchInput :
        `${import.meta.env.VITE_API_URL}/api/v1/` + passData + "?name=" + searchInput
        }`;

      const res = await axios.post(`${url}`, {}, { withCredentials: true });
      setData(res.data.data);
      setLoading(false);

    } catch (error) {
      console.log(error);
      toast.error("Type something to search!");
    }
  }

  // method for getting Data when page reload
  const getSampleData = async () => {
    setLoading(true);
    try {
      // dynamic url accoridng to page
      const url = `${passData === "new-releases" ? `${import.meta.env.VITE_API_URL}/api/v1/` + passData
        : passData === "albums" ? `${import.meta.env.VITE_API_URL}/api/v1/` + passData + "/90shindi"
          : `${import.meta.env.VITE_API_URL}/api/v1/` + passData + "?name=arijitsingh"
        }`

      const res = await axios.post(`${url}`, {}, { withCredentials: true });

      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setLoading(false);
    }

  }

  React.useEffect(() => {
    getSampleData();
  }, []);

  return (
    <div className=" flex items-center min-h-screen w-screen flex-col gap-5 bg-gray-950 subpixel-antialiased overflow-y-hidden pb-4">
      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
      <div className="flex justify-between items-center w-3/4 px-5">
        <h1 className="text-neutral-300 font-bold text-5xl text-center">{passData === "new-releases" ? "New Releases" : passData === 'artist' ? "Artist" : "Albums"}</h1>
        {
          passData !== 'new-releases' && (
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                className="rounded-2xl w-96 bg-gray-700 outline-none px-3 text-lg text-gray-300"
                placeholder="Search ..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button className="rounded-full bg-gray-500 p-2 hover:bg-white text-xl"><GoSearch /></button>
            </form>
          )
        }
      </div>

      <Divider />

      {loading ?
        <div className="h-[600px] w-full flex justify-center items-center">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /> </div> :
        <div className="flex justify-evenly items-center flex-wrap gap-5 w-8/12 p-0 my-0">
          <div className="grid grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 text-gray-300 w-full h-full">
            {
              data?.map((value) => {
                return (
                  <AlbumCard key={value.id} name={value.name} url={value.images[0]?.url} followers={value.followers?.total} tracks={value.total_tracks} passData={passData} spotify={value.external_urls.spotify} popularity={value.popularity} />
                )
              })
            }
          </div>
        </div>}
    </div>
  )
}

export default Albums;

export const AlbumCard = ({ url, name, followers, tracks, passData, spotify, popularity }: propData) => {
  return (
    <a href={spotify} target="blank" className={`flex flex-col gap-3 justify-center items-center rounded-lg bg-gradient-to-tl from-gray-900 to-gray-800 shadow-md group transition-transform duration-300 hover:scale-105 overflow-hidden text-lg pb-2 hover:cursor-pointer`}>
      {url ? <img src={url} alt="No Image" className={`h-[300px] w-full transform transition-transform duration-300 `} /> :
        <div className="h-[300px] transform transition-transform duration-300 w-[300px] bg-gradient-to-br from-cyan-700 to-cyan-950 flex justify-center items-center text-gray-300 font-semibold text-2xl">Album</div>
      }
      <div className="flex flex-col gap-1 flex-wrap w-full px-2 font-semibold">
        <span> {name}</span>
        {
          passData === 'artist' ?
            <span>Popularity : {popularity}</span> : ""
        }
        {
          passData === 'artist'
            ? (<span>Followers : {followers}</span>)
            : (<span>Total Tracks : {tracks}</span>)
        }
      </div>
    </a>
  )
}