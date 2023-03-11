export interface Artists {
  _id: string;
  image: string;
  name: string;
  isPublished: boolean,
}

export interface ArtistsMutaion {
  image: File | null;
  name:  string;
}

export interface IAlbums {
  name: string;
  image: string;
  year: number;
  col: number;
  _id: string;
  isPublished: boolean,
}

export interface AlbumMutation {
  artists: string;
  name: string;
  year: string;
  image: File | null;
}

export interface ITracks {
  _id: string;
  name: string;
  time: string;
  number: number;
  isPublished: boolean,
}

export interface ITracksMutation {
  album: string;
  name: string;
  time: string;
  number: number;
}


export interface TrackHistory {
  _id: string;
  time: string;
  name: string;
  author: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}