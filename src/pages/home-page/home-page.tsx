import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
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
import { useAppDispatch, useAppSelector } from '../../hooks/typedHooks.ts';
import {
  handleDelete,
  handleFavorite,
} from '../../services/userActionsSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';

function SingleCard({
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
    userFavoriteItems.includes(id) ?? false,
  );

  const handleLikeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(handleFavorite(id));
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

function Filter({
  filterChecked,
  handleFilterChange,
}: {
  filterChecked: boolean;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
      }}
    >
      <Typography>Show only liked cards on this page: </Typography>
      <Checkbox
        icon={<FilterAltOutlinedIcon />}
        checkedIcon={<FilterAltIcon />}
        checked={filterChecked}
        onChange={handleFilterChange}
      />
    </Container>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { page: pageFromParams = 1 } = useParams();
  const [filterChecked, setFilterChecked] = React.useState(false);
  const [page, setPage] = React.useState(Number(pageFromParams));
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    navigate(`/${value}`);
  };
  const { data: films, isLoading, isFetching } = useGetLoveMoviesQuery(page);
  const userDeletedItems = useAppSelector(
    state => state.userActions.deletedItems,
  );
  const userFavoriteItems = useAppSelector(
    state => state.userActions.favoriteItems,
  );

  const processedFilmsData = useMemo(() => {
    if (typeof films !== 'undefined') {
      return films.Search.filter(
        item => !userDeletedItems.includes(item.imdbID),
      );
    }
  }, [films, userDeletedItems]);

  const favoriteFilmsData = useMemo(() => {
    if (typeof processedFilmsData !== 'undefined') {
      return processedFilmsData.filter(item =>
        userFavoriteItems.includes(item.imdbID),
      );
    }
  }, [processedFilmsData, userFavoriteItems]);

  const totalPages = useMemo(
    () =>
      typeof films === 'undefined' ? 1 : Math.floor(films?.totalResults / 10),
    [films],
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterChecked(event.target.checked);
  };

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (
    typeof films === 'undefined' ||
    typeof favoriteFilmsData === 'undefined' ||
    typeof processedFilmsData === 'undefined'
  ) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>No Data :(</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Filter
        handleFilterChange={handleFilterChange}
        filterChecked={filterChecked}
      />
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filterChecked
            ? favoriteFilmsData.map(({ imdbID, Title, Poster }) => (
                <Grid key={imdbID}>
                  <SingleCard title={Title} image={Poster} id={imdbID} />
                </Grid>
              ))
            : processedFilmsData.map(({ imdbID, Title, Poster }) => (
                <Grid key={imdbID}>
                  <SingleCard title={Title} image={Poster} id={imdbID} />
                </Grid>
              ))}
        </Grid>
      )}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
        }}
      >
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Container>
    </Container>
  );
}
