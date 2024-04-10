import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Pagination,
  Typography,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useMemo } from 'react';
import { useGetLoveMoviesQuery } from '../../services/films.ts';

function SingleCard({ title, image }: { title: string; image: string }) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            {/*<Typography variant="body2" color="text.secondary">*/}
            {/*  Lizards are a widespread group of squamate reptiles, with over*/}
            {/*  6,000 species, ranging across all continents except Antarctica*/}
            {/*</Typography>*/}
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}

function Filter() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>Показать только залайканые карточки: </Typography>
      <Checkbox
        icon={<FilterAltOutlinedIcon />}
        checkedIcon={<FilterAltIcon />}
      />
    </Container>
  );
}

export default function HomePage() {
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data: films, isLoading, isFetching } = useGetLoveMoviesQuery(page);

  const totalPages = useMemo(
    () =>
      typeof films === 'undefined' ? 1 : Math.floor(films?.totalResults / 10),
    [films],
  );

  return (
    <Container>
      <Filter />
      <Grid container spacing={2}>
        {films?.Search.map(({ imdbID, Title, Poster }) => (
          <Grid key={imdbID}>
            <SingleCard title={Title} image={Poster} />
          </Grid>
        ))}
      </Grid>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Container>
    </Container>
  );
}
