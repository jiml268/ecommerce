
import PropTypes from 'prop-types';
import css from './ProductInfo.module.css'



export default function ProductInfo({ currentItem, uniqueColor, uniqueSize, arraySize }) {
  const colorClick = e => {
    console.log(e.target.value)
  }


  const sizeClick = e => {
    console.log(e.target.value)
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
                <button className={css.colorButton}  key={index} value={item.colorName} onClick={colorClick}>
                            
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
                <button className={css.sizeButton} key={index} value={item.sizeName} onClick={sizeClick}>
                            
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

