import axios from "axios";
import React from "react";
import { GoSearch } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import { Album, propData } from "../apiResponseTypes";
import toast, { Toaster } from "react-hot-toast";

const Albums = ({ passData }: { passData: string }) => {

  const [searchInput, setSearchInput] = React.useState('');
  const [data, setData] = React.useState<Album[]>();

  const handleSearch = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (searchInput === "" || !searchInput) {
        return toast.error("Type somethinng to search.", {
          duration: 3000, style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        })
      }

      const url = `${passData === "albums" ? "http://localhost:5000/api/v1/" + passData + "/" + searchInput :
        "http://localhost:5000/api/v1/" + passData + "?name=" + searchInput
        }`

      const res = await axios.post(`${url}`, {}, { withCredentials: true });
      console.log(res);

      const data = passData === "artist" ? res.data.artists : res.data.albums;
      setData(data);

    } catch (error) {
      console.log(error);
      toast.error("Type something to search!");
    }
  }

  // method for sending request when page reload
  const getSampleData = async () => {

    // dynamic url accoridng to page
    const url = `${passData === "albums" ? "http://localhost:5000/api/v1/" + passData + "/90shindi" :
      "http://localhost:5000/api/v1/" + passData + "?name=arijitsingh"
      }`

    const res = await axios.post(`${url}`, {}, { withCredentials: true });
    console.log(res);

    const data = passData === "artist" ? res.data.artists : res.data.albums;
    setData(data);

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
        <h1 className="text-gray-200 font-bold text-5xl text-center">{passData === 'artist' ? "Artist" : "Albums"}</h1>
        {
          passData !== 'new-release' && (
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                className="rounded-2xl w-96 bg-gray-700 outline-none px-3 text-lg"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
              <button className="rounded-full bg-gray-500 p-2  text-xl"><GoSearch /></button>
            </form>
          )
        }
      </div>

      {/* Divider */}
      <div className="border w-9/12 border-gray-700 rounded-full mb-2"></div>

      <div className="flex justify-evenly items-center flex-wrap gap-5 w-8/12 p-0 my-0">
        <div className="grid grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 text-gray-300 w-full h-full">
          {
            data?.map((value) => {
              return (
                <AlbumCard key={value.id} name={value.name} url={value.images[1].url} followers={value.followers?.total} tracks={value.total_tracks} passData={passData} spotify={value.external_urls.spotify} popularity={value.popularity} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Albums;

const AlbumCard = ({ url, name, followers, tracks, passData, spotify, popularity }: propData) => {
  return (
    <div className={`flex flex-col gap-3 justify-center items-center rounded-lg bg-gradient-to-tl from-gray-900 to-gray-800 shadow-md group transition-transform duration-300 hover:scale-105 overflow-hidden text-lg py-2`}>
      <img src={url} className={`h-[300px] w-full transform transition-transform duration-300 `} />
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
        <a className="flex justify-center items-center gap-3 mt-1 bg-gradient-to-br from-green-700 to-green-500 rounded-full  py-1" href={spotify} target="blank">Go to Spotify <FaArrowRightLong /></a>
      </div>
    </div>
  )
}