import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  time: string;
  number: number;
}

const CardForTracks: React.FC<Props> = ({ name, time, number }) => {
  return (
    <div>
      <Card
        sx={{ maxWidth: 345, display: "flex", justifyContent: "space-between" , my: 4}}
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
      </Card>
    </div>
  );
};

export default CardForTracks;
