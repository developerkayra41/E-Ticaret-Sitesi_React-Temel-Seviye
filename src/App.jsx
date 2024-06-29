import { useEffect, useState } from 'react'

import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, deleteBasket } from './redux/slices/basketSlice'

function App() {

  const { basketProducts, drawer, totalAmount } = useSelector((store) => store.basket)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateBasket())
  }, [])

  return (
    <>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' open={drawer} onClose={() => dispatch(setDrawer())} anchor='right'>
          {
            basketProducts && basketProducts.map((product) => {
              return (
                <div className='flex-row' style={{ padding: '20px' }} key={product.id}>
                  <img style={{ marginRight: '5px' }} src={product.image} width={50} height={50} />
                  <p style={{ width: '350px', marginRight: '5px' }}>{product.title}({product.count})</p>
                  <p style={{ fontWeight: 'bold' }}>{product.price}TL</p>
                  <button onClick={() => { dispatch(deleteBasket(product)), dispatch(calculateBasket()) }}>Sil</button>
                </div>
              )
            })
          }
          <div>
            <h2>Toplam Tutar: {totalAmount}</h2>
          </div>
        </Drawer>
      </PageContainer >
    </>
  )
}

export default App
