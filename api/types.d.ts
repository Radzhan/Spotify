export interface ArtistMutation {
  name: string;
  description: string;
  image: string | null;
}
export interface AlbumMutation {
  name: string;
  artists: string;
  year: number;
  image: string | null;
}

export interface AlbumWithNumber {
  name: string;
  artists: string;
  year: number;
  image: string | undefined;
  col: number;
}
export interface TrackMutation {
  name: string;
  album: string;
  time: string;
  number: number;
}
export interface IUser {
  username: string;
  password: string;
  token: string;
}
