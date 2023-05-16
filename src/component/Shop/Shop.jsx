import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

const Shop = (props) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // pagination-------

    const { totalProducts } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0)
    const [itemPerPage, setItemPerPage] = useState(10)

    // todo:make is dynamic
    // const itemPerPage = 10; 
    const totalPages = Math.ceil(totalProducts / itemPerPage);

    const pageNumbers = [...Array(totalPages).keys()]
    const options = [5, 10, 15, 20];

    // console.log(totalProducts)

    //1.done: get total number of data
    // 2. todo: decide on the number of items per page
    // 3.calculate the total number of page
    // 4.determine the current page

    // console.log(cart)

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();


    }, [currentPage, itemPerPage])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const ids = Object.keys(storedCart);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(cartProducts => {
            const savedCart = [];
        // get id. 1
        for (const id in storedCart) {
            // get the product using id . 2
            const addedProduct = cartProducts.find(product => product._id === id);
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
        })
        
    }, [])


    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product._id)

    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // pagination

    const handleSelectChange = (event) => {
        setItemPerPage(parseInt(event.target.value))
        setCurrentPage(1)

    }
    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
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
            {/* pagination */}
            <div className='pagination'>
                <p>currentPage: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}

                    >{number + 1}</button>)
                }
                <select value={itemPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>

            </div>
        </>
    );
};

export default Shop;