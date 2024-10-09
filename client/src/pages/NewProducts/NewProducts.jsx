import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, } from "react-redux";
import { getNewItems} from '../../redux/products/productsOperators'
import ProductList from "../../components/ProductList/ProductList";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";




function NewProducts() {
 const [products, setProducts] = useState(null)
  const [images, setImages] = useState(null)
  const [showCarousel, SetShowCarousel] = useState(true)
  const dispatch = useDispatch()
  
  const clickCarousel = () =>
  {
   
SetShowCarousel(false)
  }

    useEffect(() => {
        const getNewProducts = async () => {
            const response = await dispatch(getNewItems())
            console.log(response)
                setProducts(response.payload.data.result)
          setImages(response.payload.data.result1)
          SetShowCarousel(true)
        }
        getNewProducts().catch(console.error);
    }, [dispatch])
    

    

return (
  <>
    <h3>New Arrivals</h3>

    {products && !showCarousel &&
      < ProductList items={products} itemImages={images} />
    }
    { products && showCarousel &&
      < ProductCarousel items={products} itemImages={images} clickCarousel={clickCarousel} />
    } 
  </>

);
}

export default NewProducts