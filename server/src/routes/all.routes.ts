import express from "express";
import {
    getAccessToken, 
    getAlbumOfCategory, 
    getAlbumsOfArtist, 
    getArtists, 
    getArtistsTopTracks, 
    getCategories, 
    getNewReleases, 
    getTracksOfAlbum 
} from "../controller/all.controller";
import { refreshAccessToken } from "../middleware/refreshAccessToken.middleware";

const route = express.Router();

route.get("/token", getAccessToken);

route.use(refreshAccessToken);

route.get("/categories", getCategories);
route.post("/getAlbum", getAlbumsOfArtist);
route.post('/artist', getArtists);
route.post("/new-releases", getNewReleases);
route.post('/artist-top-tracks', getArtistsTopTracks);
route.post('/albums/:albumId/tracks',getTracksOfAlbum);
route.post('/albums/:category', getAlbumOfCategory);

export default route;