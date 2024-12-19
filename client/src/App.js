"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_1 = require("react-router");
const home_tsx_1 = __importDefault(require("./components/home.tsx"));
const ExplorePage_tsx_1 = __importDefault(require("./components/ExplorePage.tsx"));
const AlbumArtistNRPage_tsx_1 = __importDefault(require("./components/AlbumArtistNRPage.tsx"));
const CategoriesPage_tsx_1 = __importDefault(require("./components/CategoriesPage.tsx"));
function App() {
    return (<main className="overflow-x-hidden">
      <react_router_1.Routes>
        <react_router_1.Route path="/" element={<home_tsx_1.default />}/>
        <react_router_1.Route path="/artist" element={<AlbumArtistNRPage_tsx_1.default passData="artist"/>}/>
        <react_router_1.Route path="/albums" element={<AlbumArtistNRPage_tsx_1.default passData="albums"/>}/>
        <react_router_1.Route path="/new-releases" element={<AlbumArtistNRPage_tsx_1.default passData="new-releases"/>}/>
        <react_router_1.Route path="/categories/:id" element={<CategoriesPage_tsx_1.default />}/>
        <react_router_1.Route path="/categories" element={<ExplorePage_tsx_1.default />}/>
      </react_router_1.Routes>
    </main>);
}
exports.default = App;
