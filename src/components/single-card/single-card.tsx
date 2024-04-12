import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks.ts';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  handleDelete,
  handleDisableFavorite,
  handleEnableFavorite,
} from '../../services/userActionsSlice.ts';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SingleCard({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userFavoriteItems = useAppSelector(
    state => state.userActions.favoriteItems,
  );
  const [checked, setChecked] = React.useState(
    userFavoriteItems.some(el => el.imdbID === id) ?? false,
  );

  const handleLikeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      dispatch(
        handleEnableFavorite({
          imdbID: id,
          Title: title,
          Poster: image,
        }),
      );
    } else {
      dispatch(handleDisableFavorite(id));
    }
  };

  const handleDeleteClick = () => {
    dispatch(handleDelete(id));
  };

  return (
    <>
      <Card sx={{ width: 250 }}>
        <CardActionArea onClick={() => navigate(`/card/${id}`)}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography noWrap gutterBottom variant="h6" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={checked}
            onChange={handleLikeChange}
          />
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
