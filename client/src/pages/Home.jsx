import { useDispatch } from 'react-redux';
import { catmenu } from '../redux/products/productsOperators'
import { useEffect } from 'react';
import { useState } from 'react';

import NewProducts from "./NewProducts/NewProducts";


function Home() {
  const dispatch = useDispatch()
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
      {console.log(allCats)}
      < NewProducts type = "New" />
      < NewProducts type="Sale" />
      {allCats.map((cats) => (
      < NewProducts key={cats.CategoryID} type="Department" categoryCode={cats.CategoryID} CategoryName={cats.CategoryName} />
      ))}
</>
  )
}
export default Home