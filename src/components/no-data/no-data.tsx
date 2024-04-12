import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

export default function NoData() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography>No Data :(</Typography>
    </Container>
  );
}
