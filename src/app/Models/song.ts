export interface Song {
  source: string;
  image: string;
  details: {
    name: string;
    artist: string;
    album: string;
  };
}
