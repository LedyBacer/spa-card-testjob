import React from 'react';
import Container from '@mui/material/Container';
import { Checkbox, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function Filter({
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
      <Typography>Show only liked cards: </Typography>
      <Checkbox
        icon={<FilterAltOutlinedIcon />}
        checkedIcon={<FilterAltIcon />}
        checked={filterChecked}
        onChange={handleFilterChange}
      />
    </Container>
  );
}
