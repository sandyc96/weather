import { Box, Icon, Typography } from '@mui/material';

export default function MyHeader() {
  return (
    <>
      <Box
        sx={{
          color: '#fff',
          bgcolor: 'primary.dark',
          px: 5,
          py: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon>air</Icon>
        <Typography variant='h6'>天氣預報</Typography>
      </Box>
    </>
  );
}
