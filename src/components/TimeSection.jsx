import { Box, Grid, Icon, Typography } from '@mui/material';
import { useData } from '../contexts/DataContext';

export default function TimeSection({ generalWeather, values, children }) {
  const { formatTime } = useData();

  const { date: startDate, time: startTime } = formatTime(
    generalWeather?.StartTime
  );
  const { date: endDate, time: endTime } = formatTime(generalWeather?.EndTime);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid
          container
          sx={{
            '&>:nth-of-type(2n+2)': {
              bgcolor: { xs: 'whitesmoke', lg: 'initial' },
            },
            '&>:nth-of-type(4n+2),&>:nth-of-type(4n+3)': {
              bgcolor: { lg: 'whitesmoke' },
            },
          }}
        >
          <Grid
            size={12}
            sx={[
              {
                textAlign: 'center',
                py: 2,
                color: 'primary.main',
                fontSize: 11,
                bgcolor: '#fff',
                position: { xs: 'sticky', lg: 'static' },
                top: { xs: values.main == 0 ? 100 : 146, lg: 0 },
                zIndex: 1,
              },
            ]}
          >
            {generalWeather
              ? `${startDate}\u00A0${startTime} ~ ${endDate}\u00A0${endTime}`
              : ''}
            <Grid
              size={12}
              sx={{
                mt: 1,
                color: 'primary.main',
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon>error_outline</Icon>
              <Typography fontSize={11}>點擊縣市名稱看詳細資料</Typography>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Box>
    </>
  );
}
