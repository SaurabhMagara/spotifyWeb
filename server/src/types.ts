export type EndPointRes = {
    total_tracks?: number,
    followers?: { total: number },
    external_urls: {
        spotify: string
    };
    id: string,
    images: Image[],
    name: string,
};

type Image = {
    height: number;
    url: string;
    width: number;
}