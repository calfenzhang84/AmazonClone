import React, { forwardRef, useContext } from 'react'
import "./CheckoutProduct.css";
import { StateContext, useStateValue } from './StateProvider';


const s = () => {

}
// function CheckoutProduct({id, image, title, price, rating, hideButton }) {
const CheckoutProduct = forwardRef(({id, image, title, price, rating, hideButton }, ref) => {

    const [{basket}, dispatch] = useStateValue();//const [{basket}, dispatch] =useContext(StateContext)//const {basket, dispatch}  = useStateValue()
    const removeFromBasket = () => {
        dispatch ({
            type: "REMOVE_FROM_BASKET",
            id: id, 
        })

    };
    return (
        <div className="checkoutProduct"  ref={ref}>
            <img className="checkoutProduct__image" src={image} alt="" />
            <div className="checkoutProduct__info" >
                <p className="checkoutProduct__title" >{title}</p>
                <p className="checkoutProduct__price" >
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating" >
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>))}
                </div>
                {!hideButton &&

                    <button onClick={removeFromBasket} className="checkoutProduct__btn" >Remove from Basket</button>

                }
                
            </div>
            
        </div>
    )
});

export default CheckoutProduct
