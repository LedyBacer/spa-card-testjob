import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieByIDQuery } from '../../services/films.ts';
import { Button, CircularProgress, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CardDetails() {
  const navigate = useNavigate();
  const { id: imdbID } = useParams();
  const { data: film, isLoading } = useGetMovieByIDQuery(imdbID);

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (typeof film === 'undefined') {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>No Data :(</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Container sx={{ display: 'flex' }}>
        <img src={film.Poster} alt="Poster" />
        <Container
          sx={{
            textAlign: 'justify',
            display: 'flex',
            flexFlow: 'column',
            gap: '10px',
          }}
        >
          <Typography variant="h5">{`${film.Title} (${film.Year})`}</Typography>
          <Typography>{`Genre: ${film.Genre}`}</Typography>
          <Typography>{film.Plot}</Typography>
        </Container>
      </Container>
    </Container>
  );
}
