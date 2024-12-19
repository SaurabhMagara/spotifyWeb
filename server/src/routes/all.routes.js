"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const all_controller_1 = require("../controller/all.controller");
const refreshAccessToken_middleware_1 = require("../middleware/refreshAccessToken.middleware");
const route = express_1.default.Router();
route.get("/token", all_controller_1.getAccessToken);
route.post("/categories", refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getCategories);
route.post("/getAlbum", refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getAlbumsOfArtist);
route.post('/artist', refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getArtists);
route.post("/new-releases", refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getNewReleases);
route.post('/artist-top-tracks', refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getArtistsTopTracks);
route.post('/albums/:albumId/tracks', refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getTracksOfAlbum);
route.post('/albums/:category', refreshAccessToken_middleware_1.refreshAccessToken, all_controller_1.getAlbumOfCategory);
exports.default = route;
