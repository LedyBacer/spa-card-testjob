import { CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';

export default function Loading() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Container>
  );
}
