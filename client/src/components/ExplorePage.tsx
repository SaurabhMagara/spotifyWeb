import axios from "axios";
import React from "react";
import { Categories } from "../apiResponseTypes";
import { Link } from "react-router";

const ExplorePage = () => {

    const [data, setData] = React.useState<Categories[]>([]);

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

    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/categories", { withCredentials: true });
            console.log(res);

            const newData = res.data.categories.filter((value: { name: string }) => value.name !== `New Releases`);
            setData(newData);

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className=" flex items-center min-h-screen w-screen flex-col gap-5 bg-gray-950 subpixel-antialiased overflow-y-hidden">
            <h1 className="text-gray-200 font-bold text-5xl pt-2">Explore</h1>

            {/* Divider */}
            <div className="border w-9/12 border-gray-700 rounded-full mb-2"></div>

            <div className="flex justify-evenly items-center flex-wrap gap-5 w-8/12 p-0 my-0">

                {/* Top Two Boxes */}
                <div className="grid grid-cols-3 gap-5 w-full place-items-center py-2 ">
                    <Link to="/albums" className="w-full">
                        <div className="w-full h-52 flex justify-center items-center rounded-lg bg-gradient-to-tr from-violet-800 to-pink-700 text-2xl font-semibold text-gray-300 cursor-pointer group shadow-lg transform transition-all duration-300 hover:scale-105">
                            <span className="transform transition-transform duration-300 group-hover:scale-125">Albums</span>
                        </div>
                    </Link>
                    <div className="w-full h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg transform transition-all duration-300 hover:scale-105">
                        <span className="transform transition-transform duration-300 group-hover:scale-125">Artists</span>
                    </div>
                    <div className="w-full h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg transform transition-all duration-300 hover:scale-105">
                        <span className="transform transition-transform duration-300 group-hover:scale-125">New Releases</span>
                    </div>
                </div>

                {/* Scrollable Grid */}
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-gray-300 font-bold text-2xl  ">Categories</h1>
                    <div className="border w-full border-gray-700 rounded-full"></div>
                </div>
                <div className="grid grid-cols-4 gap-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 text-gray-300 w-full h-full">

                    {
                        data.map((value, i) => {
                            return (
                                <div
                                    key={value.id}
                                    className="h-40 flex justify-center items-center rounded-lg text-xl "
                                    style={{ background: `linear-gradient(to bottom left, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})` }}
                                >
                                    {value.name || `Item ${i + 1}`}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExplorePage;