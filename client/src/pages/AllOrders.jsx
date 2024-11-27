import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../hooks/userHooks';
import { useState } from 'react';
import { allOrders } from '../redux/orders/ordersOperators';

function AllOrders() {
    const dispatch = useDispatch()
    const { getUserId } = useAuth()
    const [listOrders, setListOrders] = useState(null)
    const [listImages, setListImages] = useState(null)
    console.log(getUserId)
    useEffect(() => {
      const getAllOrders = async () => {
        const response = await dispatch(allOrders({ id: getUserId, }))
        console.log(response)
          setListOrders(response.payload.data.ordersList)
          setListImages(response.payload.data.orderImages)
         
        }

        getAllOrders().catch(console.error);
    }, [dispatch, getUserId])

    


    return (
      <>
        {console.log(listOrders)}
        {console.log(listImages)}

        </>
    )
}

export default AllOrders
