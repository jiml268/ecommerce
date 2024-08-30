import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, } from "react-redux";
import { getNewItems} from '../../redux/products/productsOperators'
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';




function NewProducts() {



    const [products, setProducts] = useState(null)
    const [images, setImages] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const getNewProducts = async () => {
            const response = await dispatch(getNewItems())
            console.log(response)
                setProducts(response.payload.data.result)
                setImages(response.payload.data.result1)
        }
        getNewProducts().catch(console.error);
    }, [dispatch])
    
    const handleCardClick = (id) => {
    console.log(`Card with id ${id} clicked`);
    };
    
// eslint-disable-next-line react/prop-types
const MyCard = ({ id, title, content, onClick }) => {
  const prodimage = images.filter((image) => image.ProductID === id)
  console.log(prodimage)
  console.log(prodimage[0].imageName)
  return(
    <Box sx={{ width: 400 }}>
      <Card>
        <CardActionArea onClick={() => onClick(id)}>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <CardMedia
              component="img"
              height="194"
              image={window.location.origin+`/${prodimage[0].imageName}`}
              alt="Paella dish"
            />
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
};

    return (
       <Box sx={{ display: "flex", flexDirection: 'row', flexWrap: "wrap" }}>
            {products &&
               products.map((product) => (
                 <MyCard
          key={product.ProductID}
          id={product.ProductID}
          title={product.ProductName}
          content={product.Description}
          onClick={handleCardClick}
        />
                   
                   
              ))}
       
        </Box>
    )
}

export default NewProducts