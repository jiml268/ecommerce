
import PropTypes from 'prop-types';
import css from './ProductInfo.module.css'
import { useProduct } from '../../hooks/productHooks';
import { useDispatch } from 'react-redux';
import { setCurrentColor, setCurrentSize } from '../../redux/products/productsSlice';
import { addquantity, addtocart, decreasequantity, getCartByCartID } from '../../redux/cart/cartOperators';
import { useAuth } from '../../hooks/userHooks';
import { useCart } from '../../hooks/cartHooks' 
import { nanoid } from 'nanoid';
import { setCartID } from '../../redux/cart/cartSlice';
import { toast } from 'react-toastify';

export default function ProductInfo({ currentItem, uniqueColor, uniqueSize, arraySize }) {
  const toastOptions = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

         }
  const dispatch = useDispatch()
  const { getCurrentColor, getCurrentSize } = useProduct();
    const { getUserId } = useAuth();
  const { getCartID, getCurrentCart } = useCart()
  let currentQty = 0
  let maxQty = currentItem[0].stock
  console.log(getCurrentCart)
  if (getCurrentCart) {

    let getSKU = null
    console.log('getCurrentColor', getCurrentColor)
    console.log('getCurrentSize', getCurrentSize)
    console.log('currentItem', currentItem)

    
    if (uniqueColor[0].colorID!== null || uniqueSize[0].sizeName !==null) {
      getSKU = currentItem.findIndex(item => item.colorID === getCurrentColor && item.sizeName === getCurrentSize)
    }
console.log('getSKU', getSKU)

const currentSku = getSKU!==null?currentItem[getSKU].sku:currentItem[0].sku
console.log('currentSku', currentSku)



    const findInCart = getCurrentCart.findIndex(item => item.sku === currentSku)
    console.log('findInCart', findInCart)
        console.log('getCurrentCart', getCurrentCart)

    if (findInCart >= 0) {
      currentQty = getCurrentCart[findInCart].quantity
    }
  else {
currentQty = 0
  
     }
  } else {
    currentQty = 0

  }
  
  const colorClick =async  e => {
   console.log(e.target.value)
    await dispatch(setCurrentColor(e.target.value))
          console.log(getCurrentColor)

  }


  const sizeClick = async e => {
  console.log(e.target.value)
    await dispatch(setCurrentSize(e.target.value))
      console.log(getCurrentSize)

  }

  const addClicked = async () => {
    if ((uniqueColor[0].colorID!== null && getCurrentColor === "") || (uniqueSize[0].sizeName !==null && getCurrentSize === "")) {
      toast.warning("Please choose a color and size", 
            toastOptions);
        return
    }

let getSKU = null
    if (uniqueColor[0].colorID!== null || uniqueSize[0].sizeName !==null) {
      getSKU = currentItem.findIndex(item => item.colorID === getCurrentColor && item.sizeName === getCurrentSize)
    }

    let holdCartID = ""
    if (getCartID === "") {
      holdCartID = nanoid(10)
    } else {
      holdCartID = getCartID
    }
    const additem = { sku: getSKU > 0 ? currentItem[getSKU].sku : currentItem[0].sku, cartID: holdCartID, id: getUserId }

  await dispatch(addtocart(additem))
  await dispatch(setCartID(holdCartID)) 
    await dispatch(getCartByCartID(additem))
    await dispatch(setCurrentSize(""))
    await dispatch(setCurrentColor(""))
  }

  const changeClicked = async e => {

let getSKU = null
    if (uniqueColor[0].colorID!== null || uniqueSize[0].sizeName !==null) {
      getSKU = currentItem.findIndex(item => item.colorID === getCurrentColor && item.sizeName === getCurrentSize)
    }

    const changeQty = {sku:getSKU > 0 ? currentItem[getSKU].sku : currentItem[0].sku, cartID: getCartID, id: getUserId}
    if (e.target.name === "increase") {
      await dispatch(addquantity(changeQty))
    }
    if (e.target.name === "decrease") {
      await dispatch(decreasequantity(changeQty))
    }
    await dispatch(getCartByCartID(changeQty))

  }

  return (
   
    <div>
     

      {arraySize > 0 && <>
        <div className={css.cartButtons}>
           <button type='button' onClick={changeClicked} value={currentItem[0].sku} name='decrease' className={`${css.changeQnty} ${currentQty === 0?css.hideButton:""}`}> -
          </button >
        <button type='button' onClick={addClicked} value={currentItem[0].sku} className={`${css.addtocart} ${currentQty>0?css.incart:""}`}>{
          currentQty === 0 ?
            "Add to Cart" : currentQty
        }
          </button >
          <button type='button' onClick={changeClicked} value={currentItem[0].sku} name='increase' className={`${css.changeQnty} ${currentQty === 0 || currentQty >=maxQty  ?css.hideButton:""}`}> +
          </button >
          </div>
        <h2> {currentItem[0].ProductName}</h2>
        <h3>{currentItem[0].Description}</h3>
        {currentItem.length > 0 &&
        
          <ul>
            
          {currentItem.map((item, index) => (
            <div key={index}>
              {item.SpecName !== null &&
                <li key={index}>
                            
                  {item.SpecName}  {item.SpecValue}
                </li>
              }
            </div>
          )
          )
          }
                
        </ul>}
        {uniqueColor.length > 0 && <div className={css.colorSection}>
            
          {uniqueColor.map((item, index) => (
            <div key={index}>
              {item.colorName !== null &&
                <button className={`${css.colorButton} ${item.colorID === getCurrentColor ? css.buttonactive : ''}`} key={index} value={item.colorID} onClick={colorClick}
                disabled= {currentItem.findIndex(iteminfo => iteminfo.colorID === item.colorID && iteminfo.sizeName ===getCurrentSize &&iteminfo.stock)<0}
                >
                            
                  {item.colorName}
                </button>
              }
            </div>
          )
                  
          )
          }
        </div>
        }        
          {uniqueSize.length > 0 && <div className={css.sizeSection}>
          {uniqueSize.map((item, index) => (
            <div key={index}>
              {item.sizeName !== null &&
                <button className={`${css.sizeButton} ${item.sizeName === getCurrentSize ? css.buttonactive : ''}`} key={index} value={item.sizeName} onClick={sizeClick}
                disabled= {currentItem.findIndex(iteminfo => iteminfo.colorID === getCurrentColor && iteminfo.sizeName ===item.sizeName &&iteminfo.stock)<0}
                >
                  {item.sizeName}
                </button>
              }
            </div>
          )
          )
          }
         </div>
          }            
      </>
      }
    </div>
  )
}
    
    
//     <Paper
//       sx={(theme) => ({
//         p: 2,
//         margin: 'auto',
//         maxWidth: 500,
//         flexGrow: 1,
//         backgroundColor: '#fff',
//         ...theme.applyStyles('dark', {
//           backgroundColor: '#1A2027',
//         }),
//       })}
//     >
    

//       {arraySize > 0 &&
   
//         <>
//           <Grid item xs={12} sm container>
//             <Grid item xs container direction="column" spacing={2}>
//               <Grid item xs>
//                 <Typography gutterBottom variant="subtitle1" component="div">
//                  {currentItem[0].ProductName}
//                 </Typography>
//                  <Typography gutterBottom variant="subtitle1" component="div">
//                  {currentItem[0].Description}
//                 </Typography>
//                 <Typography variant="body2" gutterBottom>
//                   <List
//    sx={{
//         listStyleType: 'disc',
//         listStylePosition: 'inside'
//       }}
//                   >{currentItem.length > 0 &&
//                       currentItem.map((item, index) => (
//                         <div key={index}>
//                           {item.SpecName !== null &&
//                             <ListItem sx={{ display: 'list-item' }} key={index}>
                            
//                               {item.SpecName}  {item.SpecValue}
//                             </ListItem>
//                           }
//                         </div>
//                     )
//                   )
//                   }
// </List>
//                 </Typography>
//                  <Typography variant="body2" gutterBottom>
//                   <List
//    sx={{
//         listStyleType: 'disc',
//         listStylePosition: 'inside'
//       }}
//                   >{uniqueColor.length > 0 &&
//                       uniqueColor.map((item, index) => (
//                         <div key={index}>
//                           {item.colorName !== null &&
//                             <ListItem sx={{ display: 'list-item' }} key={index}>
                            
//                               {item.colorName}
//                             </ListItem>
//                           }
//                         </div>
//                     )
//                   )
//                   }
// </List>
//                 </Typography>
//                   <Typography variant="body2" gutterBottom>
//                   <List
//    sx={{
//         listStyleType: 'disc',
//         listStylePosition: 'inside'
//       }}
//                   >{uniqueSize.length > 0 &&
//                       uniqueSize.map((item, index) => (
//                         <div key={index}>
//                           {item.sizeName !== null &&
//                             <ListItem sx={{ display: 'list-item' }} key={index}>
                            
//                               {item.sizeName}
//                             </ListItem>
//                           }
//                         </div>
//                     )
//                   )
//                   }
// </List>
//                 </Typography>
//               </Grid>
              
//             </Grid>
//             <Grid item>
//               <Typography variant="subtitle1" component="div">
//                 ${currentItem[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//               </Typography>
//             </Grid>
//           </Grid>
//               </>
//           }
//    </Paper>
//   );
// }

ProductInfo.propTypes = {
  currentItem: PropTypes.array,
    uniqueColor: PropTypes.array,
    uniqueSize: PropTypes.array,
    arraySize: PropTypes.number

};

