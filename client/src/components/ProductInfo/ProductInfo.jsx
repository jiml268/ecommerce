
import PropTypes from 'prop-types';
import css from './ProductInfo.module.css'
import { useProduct } from '../../hooks/productHooks';
import { useDispatch } from 'react-redux';
import { setCurrentColor, setCurrentSize } from '../../redux/products/productsSlice';


export default function ProductInfo({ currentItem, uniqueColor, uniqueSize, arraySize }) {
  const dispatch = useDispatch()
  const { getCurrentColor, getCurrentSize } = useProduct();


  
  const colorClick = e => {
   
    dispatch(setCurrentColor(e.target.value))
  }


  const sizeClick = e => {
  
    dispatch(setCurrentSize(e.target.value))
  }

  return (
   
    <div>
      {arraySize > 0 && <>
        <h2> {currentItem[0].ProductName}</h2>
        <h3>{currentItem[0].Description}</h3>
        {currentItem.length > 0 && <ul>
            
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

