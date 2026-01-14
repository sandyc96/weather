import { Grid, Tooltip, Zoom } from '@mui/material';
import { useCounty } from '../contexts/CountyContext';

export default function Info(props) {
  const { children, index, ...other } = props;
  const { detail } = useCounty();

  return (
    <Tooltip
      key={index}
      slots={{
        transition: Zoom,
      }}
      placement='bottom-start'
      enterDelay={0}
      followCursor
      {...other}
    >
      <Grid
        container
        size={{ xs: 12, lg: 6 }}
        direction={'row'}
        onClick={detail}
        sx={{
          textAlign: 'center',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderRight: '1px solid',
          borderBottom: '1px solid',
          borderLeft: { xs: '1px solid', lg: '0' },
          borderColor: { xs: 'divider' },
          color: 'gray',
          textDecoration: 'none',
          height: '3.6rem',
          '&:hover': {
            cursor: 'pointer',
          },
          '&:nth-of-type(2)': {
            borderTop: '1px solid',
            borderColor: 'divider',
          },
          '&:nth-of-type(3)': {
            borderTop: { xs: '0', lg: '1px solid' },
            borderColor: { lg: 'divider' },
          },
          '&:nth-of-type(even)': {
            borderLeft: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {children}
      </Grid>
    </Tooltip>
  );
}
