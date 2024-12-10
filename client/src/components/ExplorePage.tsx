import axios from "axios";
import { useTokenContext } from "../context/tokenContext";

const ExplorePage = () => {
    const { token } = useTokenContext();

    const colors = [
        "#1E3264",
        "#5F8108",
        "#DB148B",
        "#B02897",
        "#B95D06",
        "#8E66AC",
        "#E13300",
        "#777777",
        "#44768D",
        "#A56752",
        "#E51E31",
        "#137A09",
        "#C49687",
        "#E8125C",
        "#B06339",
        "#985F4D"
      ];
      
    const getCategories = async()=>{
        try {
            const res = await axios.post("http://localhost:5000/api/v1/categories",
                {
                    token: token
                },
                {withCredentials: true}
            );
            

        } catch (error) {
            console.log(error);            
        }
    }

    return (
        <div className="flex items-center  h-screen w-screen flex-col bg-gray-950 subpixel-antialiased">
            <h1 className="text-gray-200 font-semibold text-5xl m-5">Explore</h1>
            {/* Divider */}
            <div className="border w-9/12 border-gray-700 rounded-full"></div>
            {/* end */}
            <div className=" flex justify-evenly items-center flex-wrap gap-3  w-8/12 p-4 my-2">
                <div className="grid grid-cols-2 gap-5 w-full place-items-center px-5 py-2">
                    <div className="w-full h-56 flex justify-center items-center rounded-lg bg-gradient-to-tr from-violet-800 to-pink-700 text-2xl font-semibold text-gray-300  cursor-pointer group ">
                        <span className="transform transition-transform duration-300 group-hover:scale-125">Albums</span>
                    </div>
                    <div className="w-full h-56 flex justify-center items-center rounded-lg bg-gray-800 text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group">
                        <span className="transform transition-transform duration-300 group-hover:scale-125">Artists</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ExplorePage;