require("dotenv").config();
const functions = require("firebase-functions");

const express = require("express");

const cors = require("cors");

// eslint-disable-next-line max-len
const stripe = require("stripe")(process.env.API_KEY);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total; //can use request.param
  console.log("Payment Request Recieved Boom !!! for this amout >>>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // ok - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// API example endpoint which simulate app.get("/", ...)
//http://localhost:5001/challenge-ccbb3/us-central1/api
