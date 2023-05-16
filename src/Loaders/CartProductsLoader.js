import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    console.log(ids)

    const loadProducts = await fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadProducts.json();
    // if  cart data is in database, you have to use async await

    


    const savedCart = [];


    console.log(storedCart);
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    // if need to send 2 things
    // return [products, savedCart];
    // return {products, cart: savedCart};
    return savedCart;
}

export default cartProductsLoader;