import { Hearts } from 'react-loader-spinner';
import { Box } from '@mui/material';
function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh / 6)" // Set the minHeight to 1/6th of the viewport height
    >
      <Hearts 
        height="200"
        width="200"
        color="#4fa94d"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
/>
    </Box>
  );
}

export default Loader;
