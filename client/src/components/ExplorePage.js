"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const Divider_1 = __importDefault(require("./Divider"));
const react_hot_toast_1 = __importStar(require("react-hot-toast"));
const react_loader_spinner_1 = require("react-loader-spinner");
const ExplorePage = () => {
    const [data, setData] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(false);
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
        setLoading(true);
        try {
            const res = await axios_1.default.post(`${import.meta.env.VITE_API_URL}/api/v1/categories`, {}, { withCredentials: true });
            const newData = res.data.categories.filter((value) => value.name !== `New Releases`);
            setData(newData);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            react_hot_toast_1.default.error("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    };
    react_1.default.useEffect(() => {
        getCategories();
    }, []);
    return (<div className=" flex items-center min-h-screen w-screen flex-col gap-5 bg-gray-950 subpixel-antialiased overflow-y-hidden">
            <react_hot_toast_1.Toaster position="bottom-right" reverseOrder={false}/>

            <h1 className="text-gray-200 font-bold text-5xl pt-2">Explore</h1>

            <Divider_1.default />

            <div className="flex justify-evenly items-center flex-wrap gap-5 w-11/12 sm:w-9/12 p-0 my-0">

                {/* Top Two Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full place-items-center py-2 ">
                    <react_router_1.Link to="/albums" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg bg-gradient-to-tr from-violet-800 to-pink-700 text-2xl font-semibold text-gray-300 cursor-pointer group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125">Albums</span>
                        </div>
                    </react_router_1.Link>
                    <react_router_1.Link to="/artist" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125">Artists</span>
                        </div>
                    </react_router_1.Link>
                    <react_router_1.Link to="/new-releases" className="w-full">
                        <div className="w-full h-28 sm:h-52 flex justify-center items-center rounded-lg text-2xl font-semibold text-gray-300 bg-gradient-to-tr from-blue-800 to-emerald-800 group shadow-lg sm:transform sm:transition-all sm:duration-300 sm:hover:scale-105">
                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125 text-wrap text-center">New Releases</span>
                        </div>
                    </react_router_1.Link>
                </div>

                {/* Scrollable Grid */}
                <div className="w-full flex flex-col gap-3">
                    <h1 className="text-gray-300 font-bold text-2xl ">Categories</h1>
                    <div className="border w-full border-gray-700 rounded-full"></div>
                </div>
                {loading ?
            <div className="h-[600px] w-full flex justify-center items-center">
                        <react_loader_spinner_1.Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/> </div>
            :
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:w-11/12 text-gray-300 w-full h-full">

                        {data.map((value, i) => {
                        return (<react_router_1.Link to={`/categories/:${value.name}`} key={value.id}>
                                        <div className="h-32 sm:h-40 shadow-sm flex justify-center items-center rounded-lg sm:text-lg sm:transition-transform sm:duration-300 sm:hover:scale-105 font-medium group" key={value.id} style={{ background: `linear-gradient(to bottom left, ${colors[i % colors.length]}, ${colors[(i + 1) % colors.length]})` }}>
                                            <span className="sm:transform sm:transition-transform sm:duration-300 sm:group-hover:scale-125 text-wrap text-center">{value.name || `Item ${i + 1}`}</span>
                                        </div>
                                    </react_router_1.Link>);
                    })}
                    </div>}
            </div>
        </div>);
};
exports.default = ExplorePage;
