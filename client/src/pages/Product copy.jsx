import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import  List  from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { singleProduct } from '../redux/products/productsOperators';
import { useLocation } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

// eslint-disable-next-line react/prop-types
export default function Product() {
    const dispatch = useDispatch()
  const [currentItem, SetCurrentItem] = useState({})
  const [currentImages, SetCurrentImages] = useState({})
  const [uniqueColor, setUniqueColor] = useState({})
    const [uniqueSize, setUniqueSize] = useState({})

 const [arraySize, setArraySize] = useState(0)
   const location = useLocation();
  const productID = location.state.productID
    useEffect(() => {
       
      const getItem = async () => {
          
             const getproduct = {productID: productID }

        const result = await dispatch(singleProduct(getproduct))
        console.log(result)
        SetCurrentItem(result.payload.data.product)
        SetCurrentImages(result.payload.data.image)
        setUniqueColor(result.payload.data.colors)
        setUniqueSize(result.payload.data.sizes)
      setArraySize(result.payload.data.image.length)
        }

getItem()

       
        }, [dispatch, productID ])


  return (
    
    <Paper
      sx={(theme) => ({
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      })}
    >
    

      {arraySize > 0 &&
   
        <Grid container spacing={2}>
          

          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={window.location.origin + `/images/${currentImages[0].imageName}`} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                 {currentItem[0].ProductName}
                </Typography>
                 <Typography gutterBottom variant="subtitle1" component="div">
                 {currentItem[0].Description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <List
   sx={{
        listStyleType: 'disc',
        listStylePosition: 'inside'
      }}
                  >{currentItem.length > 0 &&
                      currentItem.map((item, index) => (
                        <div key={index}>
                          {item.SpecName !== null &&
                            <ListItem sx={{ display: 'list-item' }} key={index}>
                            
                              {item.SpecName}  {item.SpecValue}
                            </ListItem>
                          }
                        </div>
                    )
                  )
                  }
</List>
                </Typography>
                 <Typography variant="body2" gutterBottom>
                  <List
   sx={{
        listStyleType: 'disc',
        listStylePosition: 'inside'
      }}
                  >{uniqueColor.length > 0 &&
                      uniqueColor.map((item, index) => (
                        <div key={index}>
                          {item.colorName !== null &&
                            <ListItem sx={{ display: 'list-item' }} key={index}>
                            
                              {item.colorName}
                            </ListItem>
                          }
                        </div>
                    )
                  )
                  }
</List>
                </Typography>
                  <Typography variant="body2" gutterBottom>
                  <List
   sx={{
        listStyleType: 'disc',
        listStylePosition: 'inside'
      }}
                  >{uniqueSize.length > 0 &&
                      uniqueSize.map((item, index) => (
                        <div key={index}>
                          {item.sizeName !== null &&
                            <ListItem sx={{ display: 'list-item' }} key={index}>
                            
                              {item.sizeName}
                            </ListItem>
                          }
                        </div>
                    )
                  )
                  }
</List>
                </Typography>
              </Grid>
              
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ${currentItem[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      }
   </Paper>
  );
}