/* eslint-disable react/prop-types */
import { useState } from 'react';



// eslint-disable-next-line react/prop-types
const ProductDetail = ({ currentItem,  }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const uniqueColors = [...new Set(currentItem.map(item => item.colorName))];
  const uniqueSizes = [...new Set(currentItem.map(item => item.sizeName))];
    const uniqueSpecs = [...new Set(currentItem.map(item => `${item.SpecName}-${item.SpecValue}`))]
const uniqueItems = uniqueSpecs.map(combination => {
  const [SpecName, SpecValue] = combination.split('-');
  return { SpecName, SpecValue };
});


  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div>
      <h1>{currentItem[0].ProductName}</h1>
      <p>{currentItem[0].Description}</p>
      <p>Brand: {currentItem[0].BrandName}</p>
      <p>Price: ${currentItem[0].price}</p>
     {console.log(uniqueItems[0].SpecName)}
      {uniqueItems[0].SpecName!== 'null'&&
       <ul>
            {console.log(uniqueItems[0].SpecName!== 'null')}
          {uniqueItems.map((item, index) => (
            
              item.SpecName !== null && <div key={index}>
              
                <li key={index}>
                            
                  {item.SpecName}
                  {item.SpecValue}

                </li>
              
              </div>
            
          )
          )
          }
                
        </ul>
}

      <label>
        Color:
        <select value={selectedColor} onChange={handleColorChange}>
          <option value="">Select Color</option>
          {uniqueColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </label>

      <label>
        Size:
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select Size</option>
          {uniqueSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </label>

      <button disabled={!selectedColor  || !selectedSize}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
