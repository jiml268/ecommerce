import { useEffect } from "react"
import { useState } from "react"
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';



function ProductList({ items, itemImages }) {
    const nav = useNavigate();
 

 const [products, setProducts] = useState(items)
    const [images, setImages] = useState(itemImages)
    

   useEffect(() => {
        setProducts(items)
        setImages(itemImages)
        }, [items,itemImages ])
    
    const handleCardClick = (id) => {
     
        nav('/showProduct',{state:{productID:id }});
    };
    
// eslint-disable-next-line react/prop-types
const MyCard = ({ id, title, content, price, onClick }) => {
  const prodimage = images.filter((image) => image.ProductID === id)
  const showimage = window.location.origin + `/images/${prodimage[0].imageName}`
  
  return (
    <Box sx={{ width: 400, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <CardActionArea onClick={() => onClick(id)} sx={{ flex: 1 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <CardMedia
              component="img"
              height="194"
              image={showimage}
              alt="New Product"
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

return (
  <Box sx={{ display: "flex", flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', alignItems: 'stretch' }}>
    {products &&
      products.map((product) => (
       
        <MyCard
          key={product.ProductID}
          id={product.ProductID}
          title={product.ProductName}
          content={product.Description}
          price={product.Price}
          onClick={handleCardClick}
        />
      ))}
  </Box>
);
}


ProductList.propTypes = {
  items: PropTypes.array,
  itemImages: PropTypes.array
};

export default ProductList