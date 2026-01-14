import { Box, Container, Typography } from '@mui/material';

export default function MyFooter() {
  return (
    <>
      <Box bgcolor={'azure'} py={0.5}>
        <Container maxWidth={'md'}>
          <Typography fontSize={13} textAlign={'end'}>
            資料來源：中央氣象署開放資料平臺
          </Typography>
          <Typography fontSize={13} textAlign={'end'}>
            本網站參考時間：臺灣標準時間TST(GMT +08:00)
          </Typography>
        </Container>
      </Box>
    </>
  );
}
