import PropTypes from 'prop-types';
import  { useState, useEffect } from "react";
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

function ProductCarousel({ items, itemImages, clickCarousel }) {


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

 
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1241 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1
    },
    tablet: {
      breakpoint: { max: 1241, min: 800 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1
    },
    mobile: {
      breakpoint: { max: 799, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1
    },
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
      <div style={{ marginLeft: "20px" }}>
      <Carousel arrows
  autoPlaySpeed={3000} responsive={responsive}>
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
      </Carousel>
      <button type='button' onClick={clickCarousel} >Show all</button>
    </div>
    
    )
}

ProductCarousel.propTypes = {
  items: PropTypes.array,
    itemImages: PropTypes.array,
  clickCarousel: PropTypes.func
};

export default ProductCarousel