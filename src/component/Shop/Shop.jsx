import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    console.log(cart)

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    
    useEffect(()=>{
        const storedCart = getShoppingCart();
        for(const id in storedCart){
            const savedProduct = products.find(product => product.id === id);
            console.log(savedProduct)
        }
    },[products])
    const handleAddToCart =(product) =>{
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)

    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product 
                    key= {product.id}
                    product = {product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
                }

            </div>
            <div className='cart-container'>
                <Cart cart ={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;