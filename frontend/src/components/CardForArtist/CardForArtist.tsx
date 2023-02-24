import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  image: string;
  id: string;
}

const CardForArtist: React.FC<Props> = ({ id, name, image }) => {
  const navigate = useNavigate();
  let cardImage =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAhQMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAABQcEAwH/xAA1EAEAAgECAgQMBQUAAAAAAAAAAQIDBAUREgYhYdETFBUWQVFUVXSSlLMxNIGRsSM1QmJx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANiAAAAAAAAAAAAAAAAkJAAAAAAAAAAAAAAAAAJCQAAAAAHPrtXi0ODw2aLzXmrSIpSbTMzPCIiI/wCg6BN8sYvYty+jv3HlnF7FuX0d+4FITfLOL2Lcvo79x5Zxexbl9HfuBSEyd709eXwmm12OLWrTmyaW9axMzERxmY9cqYAAAAEhIAAAAAm79+V03xmD7lVJN378rp/jMH3KgpCbv29abZNHOfUTzXnqx4onrvPd2s70HTHcsG731uotOXFl6smCJ4Viv+vqmAaD0k3mmx7d41bFOW03ilKceETPXPXP6PvRzeK75t3jVcU4rReaWpM8eEx6p/V60nb9/wBsrbhj1Oky9fC0emP4mEfcOkW09G82DbNNgjkrb+rXD+GGJ9PbPYCr0g/t0fEYPu1UpSd5zYtTtGPNp8lcmLJnwWras9Ux4WqtIAAAAEhIAAAAAi9LtV4ls/jU15/A6jFfl9fC8LTx1ekwa3BODV4qZcUzEzS8cYngDGN23LU7trL6rWX5r26q19FY9UdjjbJ5t7J7r03yHm3snuvTfIDLNp3vX7RGaNFm5IzV4WieuIn0WjthPva17Wve02taeMzaeMzLY/NvZPdem+Q829k916b5AZt0e3fU4cmLbebn02o1OGeW3+Exes8Y/ZryZj6PbNiyUyY9t09b0tFq2inXEx+EqYAAAAEhIAAAAAAAAAAAAAAAABISAAAAAAAAAAAAAAAAASEgAAAAAAAAAAAAAAAAEgA//9k=";

  if (image) {
    cardImage = "http://localhost:8000/" + image;
  }

  const onCardlick = (id: string) => {
    navigate("/" + name + "/" + id);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }} onClick={() => onCardlick(id)}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CardForArtist;
