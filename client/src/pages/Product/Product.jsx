
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { singleProduct } from '../../redux/products/productsOperators';
import { useLocation } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import css from './Product.module.css'
import ProductInfo from '../../components/ProductInfo/ProductInfo';
import { setCurrentColor } from '../../redux/products/productsSlice';
import { useProduct } from '../../hooks/productHooks';

export default function Product() {
    const dispatch = useDispatch()
  const [currentItem, SetCurrentItem] = useState({})
  const [currentImages, SetCurrentImages] = useState({})
  const [uniqueColor, setUniqueColor] = useState({})
  const [uniqueSize, setUniqueSize] = useState({})
const [arraySize, setArraySize] = useState(0)
   const location = useLocation();
  const productID = location.state.productID
  const { getCurrentColor, } = useProduct();

console.log(productID)
  
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
    

        dispatch(setCurrentColor(result.payload.data.colors.length > 0?result.payload.data.colors[0].colorID:""))
     
        }

      getItem()

       
        }, [dispatch, productID ])


  return (
    <>
    <div className={css.container}>
   
        {arraySize > 0 &&
          <>
        

          <Carousel images={currentImages.filter((image) => image.colorID === getCurrentColor)} />
          < ProductInfo currentItem={currentItem} uniqueColor={uniqueColor} uniqueSize={uniqueSize} arraySize={arraySize} />
          </>
      }
      
        </div>
    </>
  );
}