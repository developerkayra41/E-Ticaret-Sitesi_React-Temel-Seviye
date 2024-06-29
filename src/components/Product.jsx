import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, image, title, description } = product;
    const navigate = useNavigate();

    // console.log(product)
    return (
        <div className='card'>
            <div style={{ height: '250px' }}>
                <img className='image' src={image} />

            </div>
            <div>
                <p style={{ textAlign: 'center', height: '80px' }}>{title}</p>
                <h3 style={{ textAlign: 'center' }}>{price}₺</h3>
            </div>
            <div className='flex-row'>
                <button onClick={() => navigate("/product-details/" + id)} className='detail-button'>Detayına git</button>
            </div>
        </div>
    )
}

export default Product