import { Link } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setdisabled] = useState(true);

  const [succeeded, setsucceeded] = useState(false);
  const [processing, setprocessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  const history = useHistory();

  useEffect(() => {
    //generate the special stripe secret which allow us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // ? is Query string. After the question mark you can pass key-value pairs and use them server-side.
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The SECRET is >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setprocessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent is from object (res)
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setsucceeded(true);
        setError(null);
        setprocessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders"); //.replace when redirecting to other page)
      });
  };

  const handleChange = (e) => {
    setdisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
      </div>
      {/* Payment section - delivery address */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Delivery Address</h3>
        </div>
        <div className="payment__address">
          <p>{user?.email}</p>
          <p>123 React Lane</p>
          <p>Los Angeles, CA</p>
        </div>
      </div>
      {/* Payment section - review items */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Review items and delivery</h3>
        </div>
        <div className="payment__items">
          {basket.map((item) => {
            return (
              <CheckoutProduct
                id={item.id}
                price={item.price}
                image={item.image}
                title={item.title}
                rating={item.rating}
              />
            );
          })}
        </div>
      </div>

      {/* Payment select payment method */}
      <div className="payment__section">
        <div className="payment__title">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__detail">
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                value={getBasketTotal(basket)}
                decimalScale={2}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                renderText={(value) => <h3>Order Total: {value} </h3>}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
            {/* Errors */}
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
