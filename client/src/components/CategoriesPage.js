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
const react_hot_toast_1 = __importStar(require("react-hot-toast"));
const react_router_1 = require("react-router");
const Divider_1 = __importDefault(require("./Divider"));
const AlbumArtistNRPage_1 = require("./AlbumArtistNRPage");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const react_loader_spinner_1 = require("react-loader-spinner");
const CategoriesPage = () => {
    const { id } = (0, react_router_1.useParams)();
    const [data, setData] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(false);
    const getResponse = async () => {
        setLoading(true);
        try {
            const res = await axios_1.default.post(`${import.meta.env.VITE_API_URL}/api/v1//albums/${id}`, {}, { withCredentials: true });
            setData(res.data.data);
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
        getResponse();
    }, []);
    return (<div className=" flex items-center min-h-screen w-screen flex-col bg-gray-950 subpixel-antialiased overflow-y-hidden pb-4">
            <react_hot_toast_1.Toaster position="bottom-right" reverseOrder={false}/>

            <header className="flex justify-center items-center w-3/4 py-3 sm:py-4">
                <h1 className="text-gray-200 font-bold text-3xl sm:text-4xl md:text-5xl text-center">
                    {id?.slice(1, id.length)}
                </h1>
            </header>

            <Divider_1.default />

            {loading ?
            <div className="h-[600px] w-full flex justify-center items-center">
                    <react_loader_spinner_1.Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/> </div>
            : <div className="flex justify-evenly items-center flex-wrap gap-3 sm:gap-5 w-10/12 sm:w-10/12 md:w-9/12 pt-2 sm:pt-5">
                    <div className="grid grid-cols-1 sm gap-5 lg:grid-cols-3 sm:grid-cols-2 text-gray-300 w-full h-full">
                        {data.map((value) => {
                    return <AlbumArtistNRPage_1.AlbumCard key={value.id} name={value.name} url={value.images[0].url} spotify={value.external_urls.spotify} tracks={value.total_tracks}/>;
                })}
                    </div>
                </div>}
        </div>);
};
exports.default = CategoriesPage;
