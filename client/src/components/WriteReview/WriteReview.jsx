import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
const WriteReview = ({ setReview, productReview,handleSubmit }) => {

  
    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Let us Know What you think
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                <Typography component="h1" variant="h5">
            Your Review
          </Typography>         
                        </Grid>   

             <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="review"
                  label="review"
                  name="review"
                autoComplete="review"
                value={productReview.review}
                onChange={setReview}
                />
                        </Grid>
                        <Grid item xs={12}>
                <Typography component="h1" variant="h5">
            Title for your review
          </Typography>         
                        </Grid>   
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="title"
                  label="title"
                  type="title"
                  id="title"
                autoComplete="title"
                value={productReview.title}
                onChange={setReview}
                />
                        </Grid>  

              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
           What name do you want to show
          </Typography>         
                        </Grid>   
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="name"
                  type="name"
                  id="name"
                autoComplete="name"
                value={productReview.name}
                onChange={setReview}
                />
                        </Grid>            
                        
            </Grid>
            <Button
              type="submit"
              disabled= {!(productReview.review!== ""&& productReview.title !== "" && productReview.name !== "")}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Review
            </Button>
           
          </Box>
        </Box>
      
      </Container>
    )

}

WriteReview.propTypes = {
  productReview: PropTypes.object,
  setReview: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default WriteReview;