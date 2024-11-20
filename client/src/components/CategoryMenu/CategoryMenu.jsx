import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { catmenu } from '../../redux/products/productsOperators'
import { useEffect } from 'react';
import { setSearchResults } from '../../redux/products/productsSlice';

const NestedDropdown = () => {

 const dispatch = useDispatch()
    const [allCats, setAllCats] = useState([])
    const [allsubCats, setAllSubcats] = useState([])
    const [selectedOption, setSelectedOption] = useState('');

     useEffect(() => {
     
        const getCategories = async () => {
            const result = await dispatch(catmenu())
          
            if (result.payload.data.code === 200) {
                setAllCats(result.payload.data.catList)
                setAllSubcats(result.payload.data.subcatList)
            }
        }
        getCategories()
    }, [dispatch, setAllCats,setAllSubcats]
    )

    const handleOptionChange = async (event) => {
        setSelectedOption(event.target.value);

      

        const selectedOption = event.target.options[event.target.selectedIndex];
        const dataInfo = selectedOption.getAttribute('data-info');
        dispatch(setSearchResults({ type:  dataInfo, categoryCode:event.target.value, CategoryName:"AAA" }))

    };

    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            <option data-info="default" value="">Categories</option>
            {allCats.map(category => (
                <React.Fragment key={category.CategoryID}>
                    <option data-info="cat" value={ category.CategoryID }>{category.CategoryName}</option>
                    {allsubCats
                        .filter(sub => sub.CategoryID == category.CategoryID)
                        .map(subcategory => (
                            <option key={subcategory.SubcategoryID} data-info={"sub"}  value={subcategory.SubcategoryID}>
                                &nbsp;&nbsp;&nbsp;{subcategory.SubcategoryName}
                            </option>
                        ))}
                </React.Fragment>
            ))}
        </select>
    );
};

export default NestedDropdown;