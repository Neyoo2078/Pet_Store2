import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useSelector } from 'react-redux';
import '../App.css';

import Spinner from '../components/Loader';

// import CheckoutForm from "./CheckoutForm";
// import './App.css';

const InvoicesPage = () => {
  const { cart } = useSelector((state) => state.Product);

  const stripePromise = loadStripe(
    'pk_test_51ObkXbDgUYFhmYhXtUmhXA9NnBzXYSrWk0zrHxTgBgIk1iCME3XupADKGGaFFSYboU6G7nC1FHUVgNq4kTu1sj4x00Z94f56sj'
  );

  const [clientSecret, setClientSecret] = useState('');
  const [Amount, setAmount] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.REACT_APP_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setAmount(data.Amount);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (!clientSecret) {
    return (
      <>
        <Spinner color="#f04336" />
      </>
    );
  }

  return (
    <div className="paymentContainer">
      <div className="shadow-lg w-full p-4 sm:p-0  sm:w-[30%] sm:pb-[10px] h-[95%] items-center justify-start flex flex-col">
        <div className="w-full py-[30px] bg-[#6487f1] flex justify-center">
          <h1>Pet Store</h1>
        </div>
        <div className="w-full py-[30px] bg-[#efefef] font-bold flex justify-center ">
          <h1>${Amount}</h1>
        </div>
        <div className=" w-full sm:w-[95%] p-[20px] border-[1px]">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={clientSecret} />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesPage;
