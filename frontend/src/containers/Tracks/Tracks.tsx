import { Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CardForTracks from "../../components/CardForTracks/CardForTracks";
import { getTracks, TracksArray } from "../../store/spotify";

const Tracks = () => {
  const arrayWithTracks = useAppSelector(TracksArray);
  const { id, name, author } = useParams();

  const dispatch = useAppDispatch();
  const requestAlbum = useCallback(async () => {
    await dispatch(getTracks(id!));
  }, [dispatch, id]);

  useEffect(() => {
    requestAlbum().catch(console.error);
  }, [requestAlbum]);

  const createCard = arrayWithTracks.map((element) => {
    return (
      <CardForTracks
        name={element.name}
        time={element.time}
        key={element._id}
        id={element._id}
        number={element.number}
      />
    );
  });

  return createCard.length !== 0 ? (
    <div>
      <Typography gutterBottom variant="h5" component="div">
        Author: {author}
        <Typography gutterBottom variant="h6" component="div">
          Album: {name}
        </Typography>
      </Typography>
      {createCard}
    </div>
  ) : (
    <div>No Tracks</div>
  );
};

export default Tracks;
