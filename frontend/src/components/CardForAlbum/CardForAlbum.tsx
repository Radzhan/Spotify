import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "../../app/hooks";
import {deleteAlbum} from "../../store/spotify";
interface Props {
  image: string;
  name: string;
  col: number;
  year: number;
  id: string;
  author: string;
  isAdmin: boolean;
  onDelete?: () => void;
}

const CardForAlbum: React.FC<Props> = ({
  author,
  id,
  image,
  name,
  col,
  year,
  isAdmin,
  onDelete,
}) => {
  const navigate = useNavigate();

  let cardImage =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHcAhQMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAABQcEAwH/xAA1EAEAAgECAgQMBQUAAAAAAAAAAQIDBAUREgYhYdETFBUWQVFUVXSSlLMxNIGRsSM1QmJx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANiAAAAAAAAAAAAAAAAkJAAAAAAAAAAAAAAAAAJCQAAAAAHPrtXi0ODw2aLzXmrSIpSbTMzPCIiI/wCg6BN8sYvYty+jv3HlnF7FuX0d+4FITfLOL2Lcvo79x5Zxexbl9HfuBSEyd709eXwmm12OLWrTmyaW9axMzERxmY9cqYAAAAEhIAAAAAm79+V03xmD7lVJN378rp/jMH3KgpCbv29abZNHOfUTzXnqx4onrvPd2s70HTHcsG731uotOXFl6smCJ4Viv+vqmAaD0k3mmx7d41bFOW03ilKceETPXPXP6PvRzeK75t3jVcU4rReaWpM8eEx6p/V60nb9/wBsrbhj1Oky9fC0emP4mEfcOkW09G82DbNNgjkrb+rXD+GGJ9PbPYCr0g/t0fEYPu1UpSd5zYtTtGPNp8lcmLJnwWras9Ux4WqtIAAAAEhIAAAAAi9LtV4ls/jU15/A6jFfl9fC8LTx1ekwa3BODV4qZcUzEzS8cYngDGN23LU7trL6rWX5r26q19FY9UdjjbJ5t7J7r03yHm3snuvTfIDLNp3vX7RGaNFm5IzV4WieuIn0WjthPva17Wve02taeMzaeMzLY/NvZPdem+Q829k916b5AZt0e3fU4cmLbebn02o1OGeW3+Exes8Y/ZryZj6PbNiyUyY9t09b0tFq2inXEx+EqYAAAAEhIAAAAAAAAAAAAAAAABISAAAAAAAAAAAAAAAAASEgAAAAAAAAAAAAAAAAEgA//9k=";

  if (image) {
    cardImage = "http://localhost:8000/" + image;
  }
  const onCardlick = (id: string) => {
    navigate("/" + name + "/" + author + "/" + id);
  };



  return (
    <div>
      <Card sx={{ maxWidth: 345 }} onClick={() => onCardlick(id)}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={cardImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Songs: {col}
          </Typography>
          <strong>Year: {year}</strong>
        </CardContent>
      </Card>
      { isAdmin ? <Button variant="contained"  onClick={onDelete}>Delete</Button> : null}
    </div>
  );
};

export default CardForAlbum;
