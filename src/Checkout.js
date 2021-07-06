import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'
import FlipMove from 'react-flip-move';


function Checkout() {

    const [{basket, user}, dispatch] = useStateValue();
    

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img className="checkout__ad" src="https://images-na.ssl-images-amazon.com/images/G/01/credit/img16/storefront/swp/swp-background6.png" alt="" />
                <div>
                    <h3>Hello, {user && user.email}</h3>
                    <h2 className="checkout__title" >Your shopping Basket</h2>
                    {/* BasketItem */}
                    {/* <CheckoutProduct /> */}
                    <FlipMove staggerDelayBy={150}
                        appearAnimation="accordionVertical"
                        enterAnimation="fade"
                        leaveAnimation="fade">
                    {basket.map((item, index) => (
                        <CheckoutProduct key={index} id={item.id} price={item.price} image={item.image} title={item.title} rating={item.rating} hideButton={false}/>
                    )
                    )}
                    </FlipMove>
                </div>
            </div>

            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
