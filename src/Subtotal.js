import React from 'react'
import  "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';


function Subtotal() {

    const [{basket}, dispatch] = useStateValue();//const {basket, dispatch}  = useStateValue();
    const history = useHistory();
    return (
        <div className="subtotal">
             <CurrencyFormat 
                value={getBasketTotal(basket)} 
                
                decimalScale={2}
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'$'} 
                renderText={value => (
                <>
                    <p>Subtotal ({basket?.length} items): <strong>{value}</strong>  </p>
                    <small className="subtotal__gift" >
                        <input type="checkbox" /> 
                        This order contains a gift
                    </small>
                </>
                )} 
             />
             <button onClick={(e) => history.push("/payment")}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
