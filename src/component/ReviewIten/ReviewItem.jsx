import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css'

const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {_id, img, price, name, quantity} = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-details'>
                <p>{name}</p>
                <p>Price: {price}</p>
                <p>Order Quantity: {quantity}</p>
            </div>
            <button onClick={()=>handleRemoveFromCart(_id)} className='btn-delete'><FontAwesomeIcon icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;