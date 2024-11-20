import { useDispatch } from 'react-redux';
import { catmenu } from '../redux/products/productsOperators'
import { useEffect } from 'react';
import { useState } from 'react';
import { useProduct } from '../hooks/productHooks';

import NewProducts from "./NewProducts/NewProducts";


function Home() {
  const dispatch = useDispatch()
  const {getSearchResults} = useProduct();
   const [allCats, setAllCats] = useState(null)
 
 useEffect(() => {
     
        const getCategories = async () => {
            const result = await dispatch(catmenu())
          
            if (result.payload.data.code === 200) {
                setAllCats(result.payload.data.catList)
               
            }
        }
        getCategories()
    }, [dispatch, setAllCats]
    )

  return (
    <>
      {/* <h1>{import.meta.env.VITE_STRIPE_PUBLIC_KEY}</h1> */}
      {!getSearchResults ? <div>
        < NewProducts type="New" />
        < NewProducts type="Sale" />
        {allCats && allCats.map((cats) => (
          < NewProducts key={cats.CategoryID} type="Department" categoryCode={cats.CategoryID} CategoryName={cats.CategoryName} />
        ))}
      </div> :
        < NewProducts type={getSearchResults.type} categoryCode={getSearchResults.categoryCode} />
      }
</>
  )
}
export default Home