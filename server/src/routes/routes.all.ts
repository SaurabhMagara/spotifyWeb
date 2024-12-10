import express from "express";
import { getAccessToken, getAlbumsOfArtist, getArtists, getArtistsTopTracks, getCategories, getNewReleases, getTracksOfAlbum } from "./controller.routes";
import { refreshAccessToken } from "../middleware/refreshAccessToken";

const route = express.Router();

route.get("/token", getAccessToken);

route.use(refreshAccessToken);

route.get("/categories", getCategories);
route.post("/getAlbum", getAlbumsOfArtist);
route.post('/getArtists', getArtists);
route.get("/new-releases", getNewReleases);
route.post('/artist-top-tracks', getArtistsTopTracks);
route.post('/albums/:albumId/tracks',getTracksOfAlbum);

export default route;