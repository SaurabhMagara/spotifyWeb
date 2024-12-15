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

route.post("/categories",refreshAccessToken, getCategories);
route.post("/getAlbum",refreshAccessToken, getAlbumsOfArtist);
route.post('/artist',refreshAccessToken, getArtists);
route.post("/new-releases",refreshAccessToken, getNewReleases);
route.post('/artist-top-tracks',refreshAccessToken, getArtistsTopTracks);
route.post('/albums/:albumId/tracks',refreshAccessToken,getTracksOfAlbum);
route.post('/albums/:category',refreshAccessToken, getAlbumOfCategory);

export default route;