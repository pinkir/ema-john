import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewIten/ReviewItem';
import './Order.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData();
    console.log(savedCart);

    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) =>{
        const remaining = cart.filter(product => product._id !== id)
        setCart(remaining);
        removeFromDb(id);
    }
    // console.log(savedCart);

    const handleClearCart =() =>{
        setCart([]);
        deleteShoppingCart()
    }
    return (
        <div>
            <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                    key = {product._id}
                    product = {product}
                    handleRemoveFromCart ={handleRemoveFromCart}></ReviewItem>)
                }

            </div>
            <div className='cart-container'>
                <Cart 
                cart = {cart}
                handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/checkout'><button className='btn-proceed'>Proceed Checkout<FontAwesomeIcon icon={faLongArrowAltRight} /></button></Link>
                </Cart>

            </div>
            </div>
        </div>
    );
};

export default Orders;