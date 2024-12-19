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
exports.AlbumCard = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const go_1 = require("react-icons/go");
const react_hot_toast_1 = __importStar(require("react-hot-toast"));
const Divider_1 = __importDefault(require("./Divider"));
const react_loader_spinner_1 = require("react-loader-spinner");
const Albums = ({ passData }) => {
    const [searchInput, setSearchInput] = react_1.default.useState('');
    const [data, setData] = react_1.default.useState();
    const [loading, setLoading] = react_1.default.useState(false);
    // Search handling
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            if (!searchInput.trim()) {
                return react_hot_toast_1.default.error("Please enter a search term.", {
                    duration: 2000,
                    style: { borderRadius: '10px', background: '#333', color: '#fff' },
                });
            }
            setLoading(true);
            const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/${passData}`;
            const url = passData === "albums" ? `${baseUrl}/${searchInput}` : `${baseUrl}?name=${searchInput}`;
            const res = await axios_1.default.post(url, {}, { withCredentials: true });
            setData(res.data.data);
        }
        catch (error) {
            react_hot_toast_1.default.error("Failed to fetch search results.");
        }
        finally {
            setLoading(false);
        }
    };
    // Fetch initial data on page load
    const getSampleData = async () => {
        setLoading(true);
        try {
            const baseUrl = `${import.meta.env.VITE_API_URL}/api/v1/${passData}`;
            const url = passData === "new-releases"
                ? baseUrl
                : passData === "albums"
                    ? `${baseUrl}/90shindi`
                    : `${baseUrl}?name=arijitsingh`;
            const res = await axios_1.default.post(url, {}, { withCredentials: true });
            setData(res.data.data);
        }
        catch (error) {
            react_hot_toast_1.default.error("Failed to fetch data.");
        }
        finally {
            setLoading(false);
        }
    };
    react_1.default.useEffect(() => {
        getSampleData();
    }, []);
    return (<div className="flex flex-col items-center min-h-screen w-screen bg-gray-950 text-neutral-300">
      <react_hot_toast_1.Toaster position="bottom-right" reverseOrder={false}/>
      
      <header className="flex flex-col sm:flex-row justify-center items-center sm:justify-between w-full sm:w-3/4 py-3 sm:py-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
          {passData === "new-releases" ? "New Releases" : passData === 'artist' ? "Artists" : "Albums"}
        </h1>
        {passData !== 'new-releases' && (<form onSubmit={handleSearch} className="relative w-64 sm:w-72 lg:w-96 mt-4 sm:mt-0">
            <input type="text" className="w-full h-12 rounded-full bg-gray-700 outline-none px-4 pr-12 text-lg text-gray-300 tracking-wide" placeholder="Search ..." value={searchInput} onChange={e => setSearchInput(e.target.value)}/>
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-white text-xl text-gray-800 transition-colors duration-200">
              <go_1.GoSearch />
            </button>
          </form>)}
      </header>

      <Divider_1.default />

      {loading ? (<div className="flex justify-center items-center h-[600px] w-full">
          <react_loader_spinner_1.Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true}/>
        </div>) : (<section className="flex flex-wrap justify-evenly items-center gap-5 w-10/12 sm:w-9/12 pt-2 sm:pt-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 text-gray-300 w-full">
            {data?.map(value => (<exports.AlbumCard key={value.id} name={value.name} url={value.images[0]?.url} followers={value.followers?.total} tracks={value.total_tracks} passData={passData} spotify={value.external_urls.spotify}/>))}
          </div>
        </section>)}
    </div>);
};
exports.default = Albums;
const AlbumCard = ({ url, name, followers, tracks, passData, spotify }) => {
    return (<a href={spotify} target="_blank" rel="noopener noreferrer" className="flex sm:flex-col items-center gap-4 rounded-xl bg-gradient-to-tl from-gray-900 to-gray-800 shadow-lg sm:transition-transform sm:duration-300 sm:hover:scale-105 sm:hover:shadow-2xl overflow-hidden">
      {url ? (<img src={url} alt={name} className="h-[64px] w-[64px] sm:h-[300px] sm:w-full object-cover rounded-l-xl sm:rounded-t-xl sm:transition-transform sm:duration-300 sm:hover:scale-110"/>) : (<div className="h-[300px] w-full flex items-center justify-center bg-gradient-to-br from-cyan-700 to-cyan-950 text-2xl font-semibold text-gray-300 rounded-t-xl">
          No Image
        </div>)}
      <div className="flex flex-col gap-1 sm:gap-3 w-full  sm:p-5 sm:bg-gray-800 rounded-b-xl">
        <span className="text-md sm:text-2xl font-medium sm:font-semibold text-gray-100 sm:truncate sm:pr-0 line-clamp-1 sm:line-clamp-none ">{name}</span>
        {passData === 'artist' ? (<span className="text-sm text-gray-400">Followers: <span className="font-medium text-white">{followers}</span></span>) : (<span className="text-sm text-gray-400">Total Tracks: <span className="sm:font-medium text-white">{tracks}</span></span>)}
      </div>
    </a>);
};
exports.AlbumCard = AlbumCard;
