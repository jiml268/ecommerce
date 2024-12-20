import {  TextField,  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../../redux/products/productsOperators';
import css from './searchProducts.module.css'

const SearchProducts = () => {
    const dispatch = useDispatch()
    const [seachTerm, setSeachTerm] = useState('')
    
     const handleSearchChange = (event) => {
    setSeachTerm(event.target.value);
    };
    
    const handleSubmit = async() => {
        const result = await dispatch(searchProduct({ searchInfo: `%${seachTerm}%` }))
        console.log(result)
    }
    const clearSearch = () => {
    setSeachTerm('')
}

    return (
        <div className={css.searchBiox}>
            <TextField 
                sx={[{ backgroundColor: "white" }, { width: "300px" }]}
      label="Search"
      variant="outlined"
      value={seachTerm}
                onChange={handleSearchChange}
            />
            {seachTerm.length > 0 &&
                <button type='button' onClick={clearSearch}>X</button>
            }
             <Button onClick={handleSubmit} variant="contained" startIcon={<SearchIcon />}>
    </Button>
        </div>

        

    )
}

export default SearchProducts;