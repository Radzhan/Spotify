export interface ArtistMutation {
  name: string;
  description: string;
  image: string | null;
}
export interface AlbumMutation {
  name: string;
  artists: string;
  year: string;
  image: string | null;
}
export interface TrackMutation {
  name: string;
  album: string;
  time: string;
}

export interface IUser { 
  username: string,
  password: string,
}
