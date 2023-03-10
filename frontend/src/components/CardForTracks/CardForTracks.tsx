import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { postHistory } from "../../store/spotify";

interface Props {
  name: string;
  time: string;
  number: number;
  id: string;
  isAdmin: boolean;
  onDelete?: () => void;
}

const CardForTracks: React.FC<Props> = ({ id, name, time, number, isAdmin, onDelete, }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const setTrack = async () => {
    await dispatch(postHistory(id));
  };
  if (!user) {
    return <Navigate to={"/register"} />;
  }
  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          display: "flex",
          justifyContent: "space-between",
          my: 4,
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {number}
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <strong>time: {time}</strong>
        </CardContent>
        <Button variant="contained" onClick={setTrack}>
          Play
        </Button>
      </Card>
	    { isAdmin ? <Button variant="contained"  onClick={onDelete}>Delete</Button> : null}
    </div>
  );
};

export default CardForTracks;
