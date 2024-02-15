import React from 'react';
import ShippingAddress from './ShippingAddress';
import { useSelector } from 'react-redux';
import { urlFor } from '../lib/client';
import { useNavigate } from 'react-router-dom';

const Payment = ({ initialValues, setActive }) => {
  const { cart } = useSelector((state) => state.Product);
  const navigate = useNavigate();

  const HandlePayment = () => {
    navigate('/checkout/payment');
  };
  return (
    <div className="w-full m-auto flex sm:flex-row flex-col gap-3 ">
      <div className="sm:w-[60%] w-full flex flex-col">
        <ShippingAddress
          initialValues={initialValues}
          setActive={setActive}
          tab="payment"
        />
        <div className="w-full border-t-[1px] flex border-b-[1px] py-[20px]">
          <div className="flex flex-col gap-4 w-[90%]">
            <p>Shipping Methods</p>
            <div className="flex gap-2 items-center">
              <p>standard shipping</p>
            </div>
            <p>{'$15 (3-5 working days)'}</p>
          </div>
          <div className="w-[10%]">
            <button
              onClick={() => {
                setActive('dispatch');
              }}
              className={`w-[66px] text-[13px] justify-center items-center  h-[34px] flex gap-3 text-[#f04336]  border-[1px] border-[#f04336]  `}
            >
              Change
            </button>
          </div>
        </div>
        <div className="mt-[60px] flex flex-col items-end gap-4">
          <table className="w-full border-none">
            <thead className="border-none">
              <tr>
                <th className="py-2 px-4 border-none text-start w-[60%]">
                  Items
                </th>
                <th className="py-2 px-4  text-center w-[20%]">Quantity</th>
                <th className="py-2 px-4 text-center w-[20%]">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((items, i) => (
                <tr key={i} className="border-t border-b ">
                  <td className="py-4 px-4  ">
                    <div className="flex">
                      <img
                        src={urlFor(items.image[0].asset._ref)}
                        className="w-[120px] h-[120px]"
                      />
                      <div className="flex flex-col justify-start px-3  gap-1">
                        <p>{items.name}</p>
                        <p>{`Age (yrs): ${items.age}`}</p>
                        <p className="font-[500]">{`${items.price}`}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4  text-center">{items.quantity}</td>
                  <td className="py-2 px-4  text-center">
                    {items.quantity * items.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={`px-[24px]  sm:block w-[154px] items-center  h-[40px] flex gap-3 text-[#fff] py-[4px] border-[1px] border-[#f04336] bg-[#f04336] `}
            type="submit"
            onClick={HandlePayment}
          >
            Make Payment
          </button>
        </div>
      </div>
      <div className="sm:w-[40%] w-full  px-[30px]  flex flex-col gap-5 sm:border-l-[1px]">
        <div className="flex gap-4 sm:border-b-[1px] py-[20px] w-[80%]  items-center">
          <input
            placeholder="Coupon Code"
            className="border-[1px] text-[16px] w-[245px] px-[8px] h-[36px] outline-none"
          />
          <button
            onClick={() => {
              // navigate('/checkout');
            }}
            className="px-[24px] text-[#fff] h-[36px] border-[1px] border-[#f04336] bg-[#e0564c]"
          >
            Apply
          </button>
        </div>
        <p>
          Order Summary <span className="text-[#507ff7]">show details</span>
        </p>
        <div className="flex justify-between">
          <p>{`Subtotal(${cart.reduce((a, b) => (a += b.quantity), 0)})`}</p>
          <p>{`$${cart.reduce((a, b) => (a += b.quantity * b.price), 0)}`}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>{`$0.00`}</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>{`$15.00`}</p>
        </div>
        <hr className="border-[1px]" />
      </div>
      <button
        className={`px-[24px]  m-auto sm:hidden w-[154px] items-center  h-[40px] flex gap-3 text-[#fff] py-[4px] border-[1px] border-[#f04336] bg-[#f04336] `}
        type="submit"
        onClick={HandlePayment}
      >
        Make Payment
      </button>
    </div>
  );
};

export default Payment;
