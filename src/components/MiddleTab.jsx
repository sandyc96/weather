import { Box, CircularProgress, Grid, Tabs, Typography } from '@mui/material';
import { weatherEmoji, week } from '../Mydata';
import Info from './Info';
import TimeSection from './TimeSection';
import { useData } from '../contexts/DataContext';

export default function MiddleTab({
  MyTab,
  MyTabPanel,
  values,
  handleChange,
  a11yProps,
}) {
  const { divide, sortedData, newDayOrder, loading } = useData();
  const myTabs = (array) =>
    array.map((text) => (
      <MyTab key={text} label={text} {...a11yProps(text)} disableRipple />
    ));
  const dayTabs = myTabs(newDayOrder);
  const timeTabs = myTabs(week.time);

  return (
    <>
      <Box>
        <Tabs
          value={values.week}
          onChange={handleChange('week')}
          aria-label='weekTabs'
          variant='fullWidth'
          indicatorColor='none'
          sx={{
            borderTop: '2px solid',
            borderLeft: '2px solid',
            borderRight: '2px solid',
            borderColor: 'primary.light',
            position: { xs: 'sticky', lg: 'static' },
            top: { xs: 48, lg: 0 },
            '& .MuiTab-root': {
              minWidth: 20,
            },
          }}
        >
          {dayTabs}
        </Tabs>
        {newDayOrder.map((text, index_day) => {
          return (
            <>
              <MyTabPanel value={values.week} index={index_day} key={text}>
                <Tabs
                  value={values.weekTime}
                  onChange={handleChange('weekTime')}
                  aria-label='timeTabs'
                  variant='fullWidth'
                  indicatorColor='none'
                  sx={{
                    borderBottom: '2px solid',
                    borderLeft: '2px solid',
                    borderRight: '2px solid',
                    borderColor: 'primary.light',
                    position: { xs: 'sticky', lg: 'static' },
                    top: { xs: 96, lg: 0 },
                  }}
                >
                  {timeTabs}
                </Tabs>
                {loading ? (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', py: 5 }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  week.time.map((_, index_dayNight) => {
                    const i = divide
                      ? index_dayNight + index_day * 2
                      : index_dayNight + index_day * 2 + 1;

                    const generalWeather = sortedData?.find(
                      (text) => text.Geocode == '10017000'
                    ).WeatherElement[14].Time[i];
                    return (
                      <MyTabPanel
                        key={index_dayNight}
                        value={values.weekTime}
                        index={index_dayNight}
                      >
                        <TimeSection
                          generalWeather={generalWeather}
                          values={values}
                        >
                          {sortedData?.map((text, index_location) => {
                            const getElement = (e, index) =>
                              text.WeatherElement[e].Time[index]
                                ?.ElementValue[0];
                            const weather = getElement(12, i)?.Weather;
                            const minT = getElement(2, i)?.MinTemperature;
                            const maxT = getElement(1, i)?.MaxTemperature;
                            return (
                              <Info
                                key={index_location}
                                title={
                                  <span>
                                    {weather}
                                    ，請點此進入
                                    {text.LocationName}網頁觀看詳細天氣內容。
                                  </span>
                                }
                              >
                                <Grid
                                  sx={{
                                    alignContent: 'center',
                                    fontSize: 14,
                                  }}
                                >
                                  {text.LocationName} &nbsp;
                                </Grid>
                                <Grid container size={3.5} direction={'column'}>
                                  <Grid fontSize={25}>
                                    {Object.keys(weatherEmoji).filter((key) =>
                                      weatherEmoji[key].includes(weather)
                                    )}
                                  </Grid>
                                  <Grid
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
                                    <Typography
                                      variant='span'
                                      color={'crimson'}
                                      fontWeight={600}
                                    >
                                      {maxT}
                                    </Typography>
                                    ℃
                                  </Grid>
                                </Grid>
                              </Info>
                            );
                          })}
                        </TimeSection>
                      </MyTabPanel>
                    );
                  })
                )}
              </MyTabPanel>
            </>
          );
        })}
      </Box>
    </>
  );
}
