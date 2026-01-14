import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Icon,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { color, weatherEmoji } from '../Mydata';
import MyBreadcrumbs from '../components/MyBreadcrumbs';
import { useCounty } from '../contexts/CountyContext';
import { useData } from '../contexts/DataContext';

export default function Location() {
  const { selectedLocation, location, handleChange } = useCounty();
  const { sortedData, loading, divide, newDayOrder, todayTomorrow } = useData();

  const [expanded, setExpanded] = useState('panel0');

  const handleExpanded = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const selectedData = sortedData?.filter(
    (text) => text.LocationName == selectedLocation
  )[0];

  const getElement = (e, t) =>
    selectedData?.WeatherElement[e].Time[t]?.ElementValue[0];

  const getEmoji = (desc) =>
    Object.keys(weatherEmoji).filter((key) => weatherEmoji[key].includes(desc));

  const weekend = (text) =>
    text.indexOf('六') == 0 || text.indexOf('日') == 0
      ? 'crimson'
      : 'secondary.light';

  return (
    <>
      <MyBreadcrumbs />
      <Container maxWidth={'md'}>
        <Typography
          id='title'
          variant='h6'
          py={1}
          sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}
        >
          <Icon>device_thermostat_sharp</Icon> 縣市預報 - {selectedLocation}
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid
              sx={{
                display: 'grid',
                gridTemplateRows: 'auto auto',
                gridAutoFlow: 'column',
              }}
            >
              <FormControl fullWidth sx={{ mb: 1, order: { xs: 2, md: 1 } }}>
                <Select
                  id='location-select'
                  value={location}
                  name='location'
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: '50vh',
                      },
                    },
                  }}
                >
                  <MenuItem
                    value={'選擇縣市'}
                    disabled
                    sx={{
                      '&.Mui-disabled': { opacity: 1 },
                    }}
                  >
                    選擇縣市
                  </MenuItem>
                  {sortedData?.map((text) => (
                    <MenuItem key={text.LocationName} value={text.LocationName}>
                      {text.LocationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Grid container spacing={2} my={2} order={{ xs: 1, md: 2 }}>
                {todayTomorrow.map((text, index) => {
                  const minT = getElement(2, index).MinTemperature;
                  const maxT = getElement(1, index).MaxTemperature;
                  const weather = getElement(14, index).WeatherDescription;
                  const emoji = weather?.split('。')[0];
                  const rain = weather?.split('。')[1].slice(4);
                  const comfort = weather?.split('。')[3];

                  return (
                    <Grid
                      key={text}
                      size={{ xs: 12, sm: 4 }}
                      component={Paper}
                      sx={{
                        textAlign: 'center',
                        color: 'gray',
                        bgcolor: '#fafafa',
                        p: 1,
                        '& p:not(:nth-of-type(2))': {
                          fontSize: 14,
                        },
                      }}
                    >
                      <Typography>{text}</Typography>
                      <Tooltip
                        title={emoji}
                        placement='bottom-start'
                        enterDelay={1}
                        followCursor
                      >
                        <Typography sx={{ fontSize: 50, cursor: 'default' }}>
                          {getEmoji(emoji)}
                        </Typography>
                      </Tooltip>
                      <Typography>
                        {minT} - {maxT}℃
                      </Typography>
                      <Typography>☂️ {rain}</Typography>
                      <Typography>{comfort}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid
              container
              mt={1}
              mb={5}
              sx={{
                '&>div:nth-of-type(1)': {
                  borderLeft: { md: '1px solid' },
                  borderColor: { md: 'divider' },
                },
                '&>div': {
                  borderRight: { md: '1px solid' },
                  borderBottom: { md: '1px solid' },
                  borderColor: { md: 'divider' },
                },
                '& div div': {
                  alignContent: 'center',
                  textAlign: 'center',
                  fontSize: 14,
                },
                '& div div:nth-of-type(2), div div:nth-of-type(3)': {
                  height: '4.2rem',
                },
                '& div div:nth-of-type(4)': {
                  height: '1.8rem',
                },
                '& div div:nth-of-type(5)': {
                  height: '3.5rem',
                },
              }}
            >
              <Grid
                container
                direction={'column'}
                size={1.5}
                sx={{
                  display: { xs: 'none', md: 'grid' },
                  '&>div:nth-of-type(1)': {
                    height: '3.2rem',
                    color: '#fff',
                    bgcolor: 'secondary.light',
                  },
                  '&>div:nth-of-type(n+2)': {
                    borderTop: '1px solid',
                    borderColor: 'lightgray',
                    color: '#fff',
                    bgcolor: 'secondary.main',
                  },
                }}
              >
                <Grid>{selectedLocation}</Grid>
                <Grid>白天</Grid>
                <Grid>晚上</Grid>
                <Grid>體感溫度</Grid>
                <Grid>紫外線</Grid>
              </Grid>
              {newDayOrder.map((text, index) => {
                const dayI = divide ? index * 2 : index * 2 + 1;
                // const nightI = divide ? index * 2 + 1 : index * 2 + 2;

                const dayMin = getElement(2, dayI).MinTemperature;
                // const nightMin = getElement(2, nightI)?.MinTemperature;
                const nightMin = getElement(2, dayI + 1).MinTemperature;
                const dayMax = getElement(1, dayI).MaxTemperature;
                // const nightMax = getElement(1, nightI)?.MaxTemperature;
                const nightMax = getElement(1, dayI + 1).MaxTemperature;

                const dayDesc = getElement(12, dayI).Weather;
                // const nightDesc = getElement(12, nightI)?.Weather;
                const nightDesc = getElement(12, dayI + 1).Weather;

                const getAT = (e, key) =>
                  selectedData?.WeatherElement[e].Time.map(
                    (text) => text.ElementValue[0]?.[key]
                  );
                const minATList = getAT(6, 'MinApparentTemperature');
                const maxATList = getAT(5, 'MaxApparentTemperature');

                const getExtremum = (m, list, i) => m(list[i], list[i + 1]);
                const minAT = getExtremum(Math.min, minATList, dayI);
                const maxAT = getExtremum(Math.max, maxATList, dayI);

                const uvIndex = getElement(13, index);

                const getNum = (index, i) =>
                  selectedData?.WeatherElement[13].Time[index].StartTime.slice(
                    0,
                    10
                  ).split('-')[i];
                const month = getNum(index, 1);
                const date = getNum(index, 2);

                return (
                  <>
                    <Grid
                      size={1.5}
                      key={`${text}-md`}
                      sx={{
                        display: { xs: 'none', md: 'grid' },
                        '&>div:nth-of-type(n+2)': {
                          borderTop: '1px solid',
                          borderColor: 'divider',
                        },
                        '&>div:nth-of-type(1)': {
                          height: '3.2rem',
                          color: '#fff',
                          bgcolor: weekend(text),
                        },
                        '&>div:nth-of-type(even)': {
                          bgcolor: 'floralwhite',
                        },
                      }}
                    >
                      <Grid>
                        <Typography fontSize={14}>
                          {month}/{date}
                        </Typography>
                        星期{text}
                      </Grid>
                      <Grid>
                        <Tooltip
                          title={dayDesc}
                          placement='bottom-start'
                          enterDelay={1}
                          followCursor
                        >
                          <Typography sx={{ fontSize: 30, cursor: 'default' }}>
                            {getEmoji(dayDesc)}
                          </Typography>
                        </Tooltip>
                        {dayMin} - {dayMax}℃
                      </Grid>
                      <Grid>
                        <Tooltip
                          title={nightDesc}
                          placement='bottom-start'
                          enterDelay={1}
                          followCursor
                        >
                          <Typography sx={{ fontSize: 30, cursor: 'default' }}>
                            {getEmoji(nightDesc)}
                          </Typography>
                        </Tooltip>
                        {nightMin} - {nightMax}℃
                      </Grid>
                      <Grid>
                        {minAT} - {maxAT}℃
                      </Grid>
                      <Grid
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'relative',
                        }}
                      >
                        <Tooltip
                          title={uvIndex.UVExposureLevel}
                          placement='bottom-start'
                          enterDelay={1}
                          followCursor
                        >
                          <div>
                            <Icon
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: ' translate(-50%, -50%) ',
                                zIndex: -1,
                                fontSize: 45,
                                color: `${color[uvIndex.UVExposureLevel]}`,
                              }}
                            >
                              wb_sunny
                            </Icon>
                            <Typography
                              sx={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                WebkitTextStroke: '0.6px #fff',
                                cursor: 'default',
                              }}
                            >
                              {uvIndex.UVIndex}
                            </Typography>
                          </div>
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid
                      size={12}
                      key={`${text}-xs`}
                      sx={[
                        {
                          display: { xs: 'grid', md: 'none' },
                          borderBottom: '1px solid',
                          borderColor: '#fff',
                        },
                        expanded === `panel${index}` && {
                          mb: { xs: 2, md: 0 },
                        },
                      ]}
                    >
                      <Accordion
                        expanded={expanded === `panel${index}`}
                        onChange={handleExpanded(`panel${index}`)}
                        square={true}
                        elevation={0}
                      >
                        <AccordionSummary
                          aria-controls='content'
                          id={`header${index}`}
                          expandIcon={
                            expanded === `panel${index}` ? (
                              <Icon
                                sx={{
                                  fontSize: '1.2rem',
                                  bgcolor: '#fff',
                                }}
                              >
                                remove_circle
                              </Icon>
                            ) : (
                              <Icon
                                sx={{
                                  fontSize: '1.2rem',
                                  bgcolor: '#fff',
                                }}
                              >
                                add_circle
                              </Icon>
                            )
                          }
                          sx={{
                            height: 140,
                            position: 'relative',
                            px: 0,
                            color: 'dimgrey',
                            '& .MuiAccordionSummary-expandIconWrapper': {
                              position: 'absolute',
                              right: 0,
                              top: '40%',
                              transform: 'translate(50%, 50%)',
                              color: weekend(text),
                            },
                          }}
                        >
                          <Grid
                            container
                            size={12}
                            height={140}
                            sx={{
                              '& div:not(:nth-of-type(1))>p:not(:nth-of-type(2))':
                                { fontSize: 14 },
                            }}
                          >
                            <Grid
                              size={4}
                              bgcolor={weekend(text)}
                              color={'#fff'}
                            >
                              <Typography>星期{text}</Typography>
                              <Typography>
                                {month}/{date}
                              </Typography>
                            </Grid>
                            <Grid
                              size={4}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                minHeight: 140,
                              }}
                            >
                              <Typography fontSize={14}>白天</Typography>
                              <Typography fontSize={55}>
                                {getEmoji(dayDesc)}
                              </Typography>
                              <Typography fontSize={14}>
                                {dayMin} - {dayMax}℃
                              </Typography>
                            </Grid>
                            <Grid
                              size={4}
                              sx={{
                                minHeight: 140,
                                bgcolor: 'floralwhite',
                              }}
                            >
                              <Typography>晚上</Typography>
                              <Typography fontSize={55}>
                                {getEmoji(nightDesc)}
                              </Typography>
                              <Typography>
                                {nightMin} - {nightMax}℃
                              </Typography>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            p: 0,
                            borderTop: '5px solid gainsboro',
                            borderBottom: '5px solid gainsboro',
                          }}
                        >
                          <Grid
                            container
                            size={12}
                            sx={{
                              color: 'dimgrey',
                              fontSize: 14,
                              '&>div>div:nth-of-type(1)': {
                                bgcolor: 'secondary.main',
                                color: '#fff',
                              },
                            }}
                          >
                            <Grid container size={12}>
                              <Grid size={4}>天氣描述</Grid>
                              <Grid size={4}>{dayDesc}</Grid>
                              <Grid size={4} sx={{ bgcolor: 'floralwhite' }}>
                                {nightDesc}
                              </Grid>
                            </Grid>
                            <Grid container size={12}>
                              <Grid size={4}>體感溫度</Grid>
                              <Grid size={8}>
                                {minAT} - {maxAT}℃
                              </Grid>
                            </Grid>
                            <Grid container size={12}>
                              <Grid size={4}>紫外線</Grid>
                              <Grid
                                size={8}
                                sx={{
                                  position: 'relative',
                                }}
                              >
                                <Icon
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: ' translate(-50%, -50%) ',
                                    fontSize: 45,
                                    color: `${color[uvIndex.UVExposureLevel]}`,
                                  }}
                                >
                                  wb_sunny
                                </Icon>
                                <Typography
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: ' translate(-50%, -50%) ',
                                    zIndex: 20,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    WebkitTextStroke: '0.6px #fff',
                                  }}
                                >
                                  {uvIndex.UVIndex}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
