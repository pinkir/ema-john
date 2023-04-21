import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // console.log(cart)

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart =[];
        // get id. 1
        for (const id in storedCart) {
            // get the product using id . 2
            const addedProduct = products.find(product => product.id === id);
            //    get quantity. 3
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // added product to saved cart . 4
                savedCart.push(addedProduct);
            }
            // console.log(addedProduct);
        }
        // set the cart. 5
        setCart(savedCart);
    }, [products])


    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product.id)

    }

    const handleClearCart =() =>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }

            </div>
            <div className='cart-container'>
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to='/orders'><button className='btn-proceed'>Review Order<FontAwesomeIcon icon={faLongArrowAltRight} /></button></Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;