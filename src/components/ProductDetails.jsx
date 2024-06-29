import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';



function ProductDetails() {
    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)

    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(0)

    const dispatch = useDispatch();

    const increment = () => {
        setCount((prev) => prev + 1)
    }

    const decrement = () => {
        setCount((prev) => prev - 1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload))
        dispatch(calculateBasket())
    }


    useEffect(() => {
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    }
    return (
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div style={{ marginRight: '40px' }}>
                <img src={image} width={300} height={500} />
            </div>
            <div>
                <h1 style={{ fontFamily: 'arial' }}>{title}</h1>
                <p style={{ fontFamily: 'arial', fontSize: '20px' }}>{description}</p>
                <h1 style={{ fontFamily: 'arial', fontSize: '50px', fontFamily: 'arial', fontWeight: 'bold', color: 'red' }}>{price}</h1>

                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <CiCirclePlus style={{ fontSize: '40px' }} onClick={increment} />
                    <span style={{ fontSize: '35px', margin: '0px 10px' }}>{count}</span>
                    <CiCircleMinus style={{ fontSize: '40px' }} onClick={decrement} />
                </div>

                <div>
                    <button onClick={addBasket} style={{ marginTop: '25px', border: 'none', padding: '10px', backgroundColor: 'orange', borderRadius: '5px', border: '1px solid black' }}>Sepete Ekle</button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails