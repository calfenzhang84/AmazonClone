import React from 'react'
import "./Order.css"
import moment from "moment"
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';


function Order({ order }) {
    return (
        <div>
            <div className="order">
                <h2>Order</h2>
                <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
                <p className="order__id"><small>{order.id}</small></p>
                {order.data.basket?.map((item, index) => {
                    return (
                        <CheckoutProduct id={item.id} price={item.price} image={item.image} title={item.title} rating={item.rating} hideButton={true}/>
                    )
                    
                })}
                <CurrencyFormat 
                    value={order.data.amount / 100} 
                    
                    decimalScale={2}
                    displayType={'text'} 
                    thousandSeparator={true} 
                    prefix={'$'} 
                    renderText={value => (
                            <h3 className="order__total">Order Total: {value} </h3>
                    )} 
                />
            </div>
        </div>
    )
}

export default Order;
