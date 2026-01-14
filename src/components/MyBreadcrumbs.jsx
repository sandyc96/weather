import {
  Box,
  Breadcrumbs,
  Container,
  Icon,
  Link,
  Typography,
} from '@mui/material';
import { useCounty } from '../contexts/CountyContext';
import { useParams } from 'react-router-dom';

export default function MyBreadcrumbs() {
  const { selectedLocation } = useCounty();
  const { county } = useParams();
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        p: 1,
        bgcolor: 'primary.light',
      }}
    >
      <Container maxWidth={'md'}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' color='inherit'>
            <Icon>home</Icon>
          </Link>
          <Link underline='hover' color='inherit' href='/'>
            縣市預報
          </Link>
          {county && (
            <Typography sx={{ color: 'inherit' }}>
              {selectedLocation}
            </Typography>
          )}
        </Breadcrumbs>
      </Container>
    </Box>
  );
}
