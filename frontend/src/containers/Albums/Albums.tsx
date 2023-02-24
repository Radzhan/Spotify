import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForAlbum from "../../components/CardForAlbum/CardForAlbum";
import { AlbumsArray, getAlbums } from "../../store/spotify";

const Albums = () => {
  const arrayWithArtists = useAppSelector(AlbumsArray);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const requestAlbum = useCallback(async () => {
    await dispatch(getAlbums(id!));
  }, [dispatch, id]);

  useEffect(() => {
    requestAlbum().catch(console.error);
  }, [requestAlbum]);

  const createCard = arrayWithArtists.map((element, index) => {
    return (
      <CardForAlbum
        image={element.image}
        name={element.name}
        col={element.col}
        year={element.year}
        key={index}
      />
    );
  });

  return createCard.length !== 0 ? (
    <div>{createCard}</div>
  ) : (
    <div>No Albums</div>
  );
};

export default Albums;
