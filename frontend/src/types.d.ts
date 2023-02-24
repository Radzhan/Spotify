export interface Artists {
  _id: string;
  image: string;
  name: string;
}
export interface IAlbums {
  artists: string;
  name: string;
  image: string;
  year: number;
  col: number;
  _id: string;
}
