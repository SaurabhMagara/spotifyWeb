import express from "express";
import { getAccessToken, getAlbumsOfArtist, getArtists, getArtistsTopTracks, getCategories, getNewReleases, getTracksOfAlbum } from "./controller.routes";

const route = express.Router();

route.get("/token", getAccessToken);
route.post("/categories", getCategories);
route.post("/getAlbum", getAlbumsOfArtist);
route.post('/getArtists', getArtists);
route.post("/new-releases", getNewReleases);
route.post('/artist-top-tracks', getArtistsTopTracks);
route.post('/albums/:albumId/tracks',getTracksOfAlbum);

export default route;