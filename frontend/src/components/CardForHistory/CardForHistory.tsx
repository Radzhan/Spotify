import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface Props {
    author: string;
    time: string;
    name: string;
}

const CardForHistory: React.FC<Props>  = ({name, author, time}) => {
  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {author}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {time}
          </Typography>
          <Typography variant="body2">{name}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardForHistory;
