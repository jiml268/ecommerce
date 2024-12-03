import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/userHooks';
import { useState } from 'react';
import { allOrders } from '../../redux/orders/ordersOperators';
import css from "./allOrders.module.css"
import PropTypes from 'prop-types';
import CardActionArea from '@mui/material/CardActionArea';
import {Card,  } from '@mui/material';

function ConvertDate({ orderdate }) {
  const formattedDate = new Date(orderdate).toLocaleDateString();

  return (
    <div key={orderdate}>
      Order date:  {formattedDate}
      
    </div>
  );
}




function AllOrders() {
    const dispatch = useDispatch()
    const { getUserId } = useAuth()
    const [listOrders, setListOrders] = useState(null)
    const [listImages, setListImages] = useState(null)
    useEffect(() => {
      const getAllOrders = async () => {
        const response = await dispatch(allOrders({ id: getUserId, }))
          setListOrders(response.payload.data.ordersList)
          setListImages(response.payload.data.orderImages)
         
        }

        getAllOrders().catch(console.error);
    }, [dispatch, getUserId])

  const showDetails = () => {
  console.log("clicked")
}

  return (
      
    <>
      {listOrders &&
        <Container component="main" maxWidth="1080px">
             

          <CssBaseline />
          {listOrders.map((item, index) => (
            <Box sx={{ maxWidth: 1080, width: "80%", display: 'flex', flexDirection: 'column', height: '100%' }} key={`box${index}`}>
              <div className={css.header}>
              < Typography component="h3" variant="h5" key={` OrderNum${index}`}>
                Order Number:  {item.ordernum}
                </Typography>
                <button type = "button" onClick={showDetails} className={css.detailButton}> Show details</button>
                </div>
              < Typography component="h5" variant="p" key={`${item.orderdate}${index}`}>
                 <ConvertDate orderdate={item.orderdate} />
                
              </Typography>
               < Typography component="h5" variant="p" key={`Orderdate${index}`}>
                Total Amount:  ${item.total_sum.toLocaleString('en-US')}
                
              </Typography>
              <div className={css.showImages}>
                {listImages.filter((image) => item.orderId === image.orderId).map((image, index) => (
                  <Card key={`card${image.imageName}`} elevation={0}>
                    <CardActionArea onClick={showDetails} key={`cardAction${image.imageName}`}>
                  <CardMedia
                    component="img"
                    image={window.location.origin + `/images/${image.imageName}`}
                    alt="New Product"
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    key={`image${index}${image.imageName}`}
                    width="80px"
                    height="80px"
                  />
                    </CardActionArea>
                    </Card>
              ))}
                </div>
            </Box>
          ))}
        </Container>
      }
        </>
    )
}


ConvertDate.propTypes = {
  orderdate: PropTypes.string,
  

};


export default AllOrders
