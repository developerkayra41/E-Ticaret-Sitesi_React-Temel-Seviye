import React, { useState } from 'react'
import '../css/Header.css'
import { CiShoppingBasket } from "react-icons/ci"
import { CiLight } from "react-icons/ci"
import { FaMoon } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../redux/slices/basketSlice'
import { filterProducts } from '../redux/slices/productSlice';

function Header() {

    const [theme, setTheme] = useState(false);
    const [value, setValue] = useState('');

    const handleInputChange = (e) => {
        setValue(e.target.value);
        dispatch(filterProducts(e.target.value));
    };


    const dispatch = useDispatch();

    const { basketProducts } = useSelector((store) => store.basket)

    const navigate = useNavigate();
    const changeTheme = () => {
        const root = document.getElementById('root');
        if (theme) {
            root.style.backgroundColor = 'black';
            root.style.color = "#fff";
        }
        else {
            root.style.backgroundColor = '#fff';
            root.style.color = "black";
        }
        setTheme(!theme);

    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className='flex-row' onClick={() => navigate('/')}>
                <img className='logo' src="./src/images/logo.png" alt="logo.png" />
                <p className='logo-text'>KAYRA A.Ş</p>
            </div>

            <div className='flex-row'>
                <input value={value} onChange={handleInputChange} className='search-input' type="text" placeholder='Bir şeyler ara...' />

                <div>
                    {
                        theme ? <FaMoon className='icon' onClick={changeTheme} /> : <CiLight className='icon' onClick={changeTheme} />
                    }
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={basketProducts.length} color="primary">
                        <CiShoppingBasket className='icon' />

                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header