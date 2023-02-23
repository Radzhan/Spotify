import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForArtist from "../../components/CardForArtist/CardForArtist";
import { Atrists, getArtists } from "../../store/spotify";

const Main = () => {
  const arrayWithArtists = useAppSelector(Atrists);
  const dispatch = useAppDispatch();
  const requestArtist = useCallback(async () => {
    await dispatch(getArtists());
  }, [dispatch]);

  useEffect(() => {
    requestArtist().catch(console.error);
  }, [requestArtist]);

  const createCard = arrayWithArtists.map((element) => {
    return (
      <CardForArtist
        name={element.name}
        image={element.image}
        key={element._id}
      />
    );
  });

  return <div>{createCard}</div>;
};

export default Main;
