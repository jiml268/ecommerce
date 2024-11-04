import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, } from "react-redux";
import { getNewItems} from '../../redux/products/productsOperators'
import ProductList from "../../components/ProductList/ProductList";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel";
import PropTypes from 'prop-types';




function NewProducts({ type, categoryCode, CategoryName }) {
  console.log(categoryCode)
 const [products, setProducts] = useState(null)
  const [images, setImages] = useState(null)
  const [showCarousel, SetShowCarousel] = useState(true)
  const dispatch = useDispatch()
  let itemtype = null
  
  const clickCarousel = () =>
  {
   
SetShowCarousel(false)
  }

  useEffect(() => {
              console.log("use effect")

      const getNewProducts = async () => {
        const response = await dispatch(getNewItems({ type: type, categoryCode: categoryCode }))
                  console.log('type', type)

          console.log('response', response)
                setProducts(response.payload.data.result)
          setImages(response.payload.data.result1)
          SetShowCarousel(true)
        }
        getNewProducts().catch(console.error);
    }, [dispatch, type, categoryCode])
  
    switch(type) {
      case "New":
        itemtype = "New Arrivals"
        break
 case "Sale":
        itemtype = "Sales Items"
        break
      case "Department":
        itemtype = CategoryName
        break
 
    default:
    break
}

return (
  <>
    <h3>{itemtype}</h3>

    {products && !showCarousel &&
      < ProductList items={products} itemImages={images} />
    }
    { products && showCarousel &&
      < ProductCarousel items={products} itemImages={images} clickCarousel={clickCarousel} />
    } 
  </>

);
}

NewProducts.propTypes = {
  type: PropTypes.string,
  categoryCode: PropTypes.number,
  CategoryName: PropTypes.string,
};


export default NewProducts