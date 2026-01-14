import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Icon,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Info from '../components/Info';
import { mainTabs, weatherEmoji } from '../Mydata';
import MiddleTab from '../components/MiddleTab';
import MyBreadcrumbs from '../components/MyBreadcrumbs';
import TimeSection from '../components/TimeSection';
import { useData } from '../contexts/DataContext';

function MyTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`mytabpanel-${index}`}
      aria-labelledby={`my-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            flexGrow: 1,
            pb: 5,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(text) {
  return {
    id: `mytab-${text}`,
    'aria-controls': `mytabpanel-${text}`,
  };
}

function MyTab(props) {
  const { ...other } = props;
  return (
    <Tab
      {...other}
      disableRipple
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'primary.light',
          color: 'primary.main',
        },
        '&.Mui-selected:hover': {
          backgroundColor: 'primary.light',
        },
        '&:hover': {
          backgroundColor: '#f9f9f9',
        },
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        p: 0,
        bgcolor: '#fff',
      }}
    />
  );
}

export default function Weather() {
  const { sortedData, loading, todayTomorrow } = useData();

  const [values, setValues] = useState({
    main: 0,
    ttTime: 0,
    week: 0,
    weekTime: 0,
  });
  const handleChange = (name) => (event, newValue) => {
    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const babyTabs = todayTomorrow.map((_, index) => {
    const t = index;
    const generalWeather = sortedData?.find(
      (text) => text.Geocode == '10017000'
    ).WeatherElement[14].Time[t];

    const info = sortedData?.map((text, index) => {
      const getElement = (e) => text.WeatherElement[e].Time[t].ElementValue[0];
      const weather = getElement(14).WeatherDescription.split('。')[0];
      const rainfallProbability = getElement(14)
        .WeatherDescription.split('。')[1]
        .slice(4);
      const minT = getElement(2).MinTemperature;
      const maxT = getElement(1).MaxTemperature;
      return (
        <Info
          key={index}
          title={
            <span>
              {getElement(14).WeatherDescription.split('。', 2).join('，')}
              ，請點此進入{text.LocationName}網頁觀看詳細天氣內容。
            </span>
          }
        >
          <Grid sx={{ alignContent: 'center', fontSize: 14 }}>
            {text.LocationName} &nbsp;
          </Grid>
          <Grid container size={3.5} direction={'column'}>
            <Grid fontSize={25}>
              {Object.keys(weatherEmoji).filter((key) =>
                weatherEmoji[key].includes(weather)
              )}
            </Grid>
            <Grid
              container
              sx={{
                display: { xs: 'initial', lg: 'none' },
                fontSize: 14,
              }}
            >
              <Typography
                variant='span'
                color={'primary.main'}
                fontWeight={600}
              >
                {minT}
              </Typography>
              ~
              <Typography variant='span' color={'crimson'} fontWeight={600}>
                {maxT}
              </Typography>
              ℃
            </Grid>
          </Grid>
          <Grid container size={1} direction={'column'}>
            <Grid fontSize={16}>☂️</Grid>
            <Grid sx={{ fontSize: 14 }}>{rainfallProbability}</Grid>
          </Grid>
        </Info>
      );
    });
    return (
      <MyTabPanel key={index} value={values.ttTime} index={index}>
        <TimeSection generalWeather={generalWeather} values={values}>
          {info}
        </TimeSection>
      </MyTabPanel>
    );
  });

  return (
    <>
      <MyBreadcrumbs />
      <Container sx={{ maxWidth: { xs: '100%', md: 750 } }}>
        <Typography
          variant='h6'
          py={2}
          color='primary.main'
          sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}
        >
          <Icon>device_thermostat_sharp</Icon> 縣市預報
        </Typography>
        <Box>
          <Tabs
            value={values.main}
            onChange={handleChange('main')}
            aria-label='mainTabs'
            variant='fullWidth'
            indicatorColor='none'
            sx={{
              position: { xs: 'sticky', lg: 'static' },
              top: { xs: 0, lg: 0 },
              zIndex: 1,
            }}
          >
            {mainTabs.map((text, index) => (
              <MyTab
                key={index}
                label={text}
                {...a11yProps(text)}
                disableRipple
              />
            ))}
          </Tabs>
          <MyTabPanel value={values.main} index={0}>
            <Tabs
              value={values.ttTime}
              onChange={handleChange('ttTime')}
              aria-label='todayTomorrowTabs'
              variant='fullWidth'
              indicatorColor='none'
              sx={{
                border: '2px solid',
                borderColor: 'primary.light',
                position: { xs: 'sticky', lg: 'static' },
                top: { xs: 48, lg: 0 },
                zIndex: 1,
              }}
            >
              {todayTomorrow.map((text) => (
                <MyTab
                  key={text}
                  label={text}
                  {...a11yProps(text)}
                  disableRipple
                />
              ))}
            </Tabs>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>{babyTabs}</>
            )}
          </MyTabPanel>
          <MyTabPanel value={values.main} index={1}>
            <MiddleTab
              MyTab={MyTab}
              MyTabPanel={MyTabPanel}
              values={values}
              handleChange={handleChange}
              a11yProps={a11yProps}
            />
          </MyTabPanel>
        </Box>
      </Container>
    </>
  );
}
