import { CircularProgress, Pagination, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useMemo } from 'react';
import { useGetLoveMoviesQuery } from '../../services/films.ts';
import { useAppSelector } from '../../hooks/typedHooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import Filter from '../../components/filter/filter.tsx';
import SingleCard from '../../components/single-card/single-card.tsx';

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
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
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
