import axios from "axios";
import { Request, Response } from "express";
import { client_id, client_secret } from "../utils/getEnv";

/** Utility to get common headers for Spotify requests */
const getSpotifyHeaders = (token: string) => ({
    "Authorization": `Bearer ${token}`
});

/** Utility to handle API errors */
const handleError = (res: Response, message: string, error: any) => {
    console.error(message, error);
    return res.status(500).json({ message, error });
};

/** Get Spotify Access Token */
export const getAccessToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token", // new URLSearchParams ensures that data is urlencoded
            new URLSearchParams({
                grant_type: "client_credentials",
                client_id,
                client_secret
            }).toString(),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
        );

        res.status(200)
            .cookie("token", response.data.access_token, { maxAge: 3600 * 1000, httpOnly: true, secure: true })
            .json({ message: "Token received" });
    } catch (error) {
        handleError(res, "Error while getting token", error);
    }
};

/** Get Spotify Categories */
export const getCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        if (!token) throw new Error("Token not found");

        const response = await axios.get("https://api.spotify.com/v1/browse/categories?limit=50", {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Categories received", categories: response.data.categories.items });
    } catch (error) {
        handleError(res, "Error while getting categories", error);
    }
};

/** Get Artists by Name */
export const getArtists = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        const name = req.query.name as string;
        if (!token) throw new Error("Token is missing");
        if (!name) throw new Error("Query parameter 'name' is missing");

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Artists received", artists: response.data.artists.items });
    } catch (error) {
        handleError(res, "Error while getting artists", error);
    }
};

/** Get Albums of an Artist */
export const getAlbumsOfArtist = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        const artist = req.query.artist as string;
        if (!token) throw new Error("Token is missing");
        if (!artist) throw new Error("Query parameter 'artist' is missing");

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
            headers: getSpotifyHeaders(token)
        });

        const artistId = response.data.artists.items[0]?.id;
        if (!artistId) throw new Error("Couldn't get artist ID");

        const albumsResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=20`, {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Albums received", albums: albumsResponse.data.items });
    } catch (error) {
        handleError(res, "Error while getting albums of artist", error);
    }
};

/** Get Artist's Top Tracks */
export const getArtistsTopTracks = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        const name = req.query.name as string;
        if (!token) throw new Error("Token is missing");
        if (!name) throw new Error("Query parameter 'name' is missing");

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
            headers: getSpotifyHeaders(token)
        });

        const artistId = response.data.artists.items[0]?.id;
        if (!artistId) throw new Error("Couldn't get artist ID");

        const tracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Top tracks received", tracks: tracksResponse.data.tracks });
    } catch (error) {
        handleError(res, "Error while getting top tracks", error);
    }
};

/** Get New Releases */
export const getNewReleases = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        if (!token) throw new Error("Token is missing");

        const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "New releases received", albums: response.data.albums.items });
    } catch (error) {
        handleError(res, "Error while getting new releases", error);
    }
};

/** Get Tracks of an Album */
export const getTracksOfAlbum = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        const albumId = req.params.albumId;
        if (!token) throw new Error("Token is missing");
        if (!albumId) throw new Error("Album ID is missing");

        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Tracks received", tracks: response.data.items });
    } catch (error) {
        handleError(res, "Error while getting album tracks", error);
    }
};

/** Get Albums of a Category */
export const getAlbumOfCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies?.token;
        const category = req.query.category as string;
        if (!token) throw new Error("Token is missing");
        if (!category) throw new Error("Category is missing");

        const response = await axios.get(`https://api.spotify.com/v1/search?q=${category}&type=album&limit=30`, {
            headers: getSpotifyHeaders(token)
        });

        res.status(200).json({ message: "Albums received", albums: response.data.albums.items });
    } catch (error) {
        handleError(res, "Error while getting albums of category", error);
    }
};


// Old code 

// import axios from "axios";
// import express from "express";
// import { client_id, client_secret } from "../utils/getEnv";

// export const getAccessToken = async (req: express.Request, res: express.Response):Promise<any> => {
//     try {

//         const response = await axios.post("https://accounts.spotify.com/api/token", {
//             grant_type: "client_credentials",
//             client_id: client_id,
//             client_secret: client_secret
//         },
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             }
//         );

//         return res
//                 .status(200)
//                 .cookie("token", response.data.access_token, { maxAge: 60 * 60 * 1000, httpOnly: true, secure :true })
//                 .json({
//                     message: "token recieved",
//                 });

//     } catch (error) {
//         console.log(error);
//         return res
//             .status(500)
//             .json({ message: "error while getting token", err: error })
//     }
// }

// export const getCategories = async (req: express.Request, res: express.Response) : Promise<any> => {
//     try {
//         const { token } = req.cookies;

//         if (!token) throw new Error("category route err : Token not found");

//         const response = await axios.get("https://api.spotify.com/v1/browse/categories?limit=50",
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );


//         return res.status(200).json({ message: "Categories recieved", categories: response.data.categories.items });

//     } catch (err) {
//         console.log(err);
//         return res
//                 .status(500)
//                 .json({ msg: "category error", error: err });
//     }
// }

// export const getArtists = async (req: express.Request, res: express.Response):Promise<any> => {
//     try {
//         const { token } = req.cookies;
//         const { name } = req.query;

//         if (!token) throw new Error("getArtists err: token is missing");

//         if (!name) throw new Error("getArtists err: query parameter missing");

//         const resposne = await axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist`,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         const artists = await resposne.data.artists.items;

//         if (!artists) throw new Error("getArtists err: cpuld'nt get Artists");

//         return res
//                 .status(200)
//                 .json({ message: "artists recieved.", artists: artists });
//     } catch (error) {
//         console.log(error);
//         return res
//                 .status(500)
//                 .json({ message: "getArtists error", error: error })
//     }
// }

// export const getAlbumsOfArtist = async (req: express.Request, res: express.Response):Promise<any> => {
//     try {
//         const { token } = req.cookies;
//         const { artist } = req.query;

//         if (!token) throw new Error("getAlbum Err : token is missing");

//         if (!artist) throw new Error("getAlbum Err: query parameter missing");

//         // first request for artist id
//         const responseToGetArtistId = await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist`,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         //get artist id 
//         const artistId = await responseToGetArtistId.data.artists.items[0].id;

//         if (!artistId) throw new Error("getAlbum err : couldn't get artistId");

//         //second request for getting that artists album
//         const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?limit=20`,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         //get album from response
//         const albums = await response.data.items;

//         if (!albums) throw new Error("getAlbum err: couldn't get albums");

//         return res
//                 .status(200)
//                 .json({ message: "albums recieved", albums: albums });

//     } catch (error) {
//         console.log(error);
//         return res
//                 .status(500)
//                 .json({ message: "getAlbum err", errro: error });
//     }
// }

// export const getArtistsTopTracks = async (req: express.Request, res: express.Response) :Promise<any> => {
//     try {
//         const { token } = req.cookies;
//         const { name } = req.query;

//         if (!token) throw new Error("artistsTopTrack err : token is missing");

//         if (!name) throw new Error("artistsTopTrack err : query param is missing");

//         const responseToGetArtistId = await axios(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });

//         const artistId = await responseToGetArtistId.data.artists.items[0].id;
//         if (!artistId) throw new Error("artistsTopTrack err : couldn't get artist id.");

//         const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         const tracks = await response.data.tracks;
//         if (!tracks) throw new Error("artistsTopTrack err : couldn't get tracks");

//         return res
//                 .status(200)
//                 .json({ message: "top tracks recieved", tracks: tracks });

//     } catch (error) {
//         console.log(error);
//         return res
//                 .status(500)
//                 .json({ message: "artistsTopTrack err", error: error })
//     }
// }

// export const getNewReleases = async (req: express.Request, res: express.Response):Promise<any> => {
//     try {
//         const { token } = req.cookies;

//         if (!token) throw new Error("getNewReleases err : token is missing");

//         const response = await axios.get("https://api.spotify.com/v1/browse/new-releases",
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         const albums = await response.data.albums.items;
//         if (!albums) throw new Error("getNewReleases err : coudn't get albums");

//         return res
//                 .status(200)
//                 .json({ message: "new Released albums recieved.", albums: albums });
//     } catch (error) {
//         console.log(error);
//         return res
//                 .status(500)
//                 .json({ messsage: "getNewReleases err", error: error });
//     }
// }

// export const getTracksOfAlbum = async (req: express.Request, res: express.Response):Promise<any> => {
//     try {
//         const { token } = req.cookies;
//         const { albumId } = req.params;

//         if (!token) throw new Error("tracksOfAlbum err: token is missing");

//         if (!albumId) throw new Error("tracksOfAlbum err: query param is missing");

//         const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}/tracks`,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );

//         const tracks = await response.data.items;
//         if (!tracks) throw new Error("tracksOfAlbum err : couldn't get tracks");

//         return res
//                 .status(200)
//                 .json({ message: "tracks recieved", tracks: tracks });
//     } catch (error) {
//         console.log(error);
//         return res
//                 .status(500)
//                 .json({ message: "tracksOfAlbum err", error: error });
//     }
// }

// export const getAlbumOfCategory = async (req : express.Request, res : express.Response):Promise<any>=>{
//     try {
//         const token = req.cookies?.token;
//         const {category} = req.query;

//         if(!token) throw new Error("getAlbumOfCatgory err : token is missing");

//         if(!category) throw new Error("getAlbumOfCatgory err : query parameter is missing");

//         const response = await axios.get(`https://api.spotify.com/v1/search?q=${category}&type=album&limit=30`,
//             {
//                 headers : {
//                     "Authorization" : `Bearer ${token}`
//                 }
//             }
//         );

//         const albums = await response.data.albums.items;

//         if(!albums) throw new Error("getAlbumOfCatgory err : couldn't get albums");

//         return res
//                 .status(200)
//                 .json({message : "Albums recieved", albums : albums});
//     } catch (error) {
//         console.log("getAlbumOfCatgory err", error);
//         return res
//                 .status(500)
//                 .json({message : "getAlbumOfCatgory error", error : error});
//     }
// }
