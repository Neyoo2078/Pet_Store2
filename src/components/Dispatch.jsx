import React from 'react';
import { useSelector } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import { useState } from 'react';
import ShippingAddress from './ShippingAddress';

const Dispatch = ({ initialValues, setActive }) => {
  const { cart, user } = useSelector((state) => state.Product);
  const [Loading, setLoading] = useState(false);
  const SubTotal = () => {
    const Total = cart.reduce((a, b) => {
      return (a += b.quantity * parseInt(b.price.slice(1)));
    }, 0);
    return Total;
  };
  return (
    <div className="w-full m-auto flex  gap-3 ">
      <div className="w-[60%] flex flex-col">
        <ShippingAddress
          initialValues={initialValues}
          setActive={setActive}
          tab="dispatch"
        />
        <div className="w-full border-t-[1px] border-b-[1px] py-[20px]">
          <div className="flex flex-col gap-4">
            <p>Shipping Methods</p>
            <div className="flex gap-2 items-center">
              <div className="border-[1px] flex gap-2 items-center rounded-full w-[20px] h-[20px]">
                <div className="border-[1px] rounded-full w-[10px] h-[10px] m-auto bg-[#1f6895]" />
              </div>
              <p>standard shipping</p>
            </div>
            <p>{'$15 (3-5 working days)'}</p>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            className={`px-[24px] w-[154px] items-center my-[20px] h-[40px] flex gap-3 text-[#fff] py-[4px] border-[1px] border-[#f04336] ${
              Loading ? 'bg-[#d0766f]' : 'bg-[#f04336]'
            } `}
            type="submit"
            disabled={Loading}
            onClick={() => {
              setActive('payment');
            }}
          >
            Continue{Loading && <MoonLoader size={15} color="#fff" />}
          </button>
        </div>
      </div>
      <div className="w-[40%]  px-[30px]  flex flex-col gap-5 border-l-[1px]">
        <div className="flex gap-4 items-center">
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
        <hr />
        <h5>Order Summary</h5>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p>
              {` Sub Total
           (${cart.reduce((a, b) => {
             return (a += b.quantity);
           }, 0)} item)`}
            </p>
            <p>{`$${SubTotal()}`}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>{`$0.00`}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{`$15.00`}</p>
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <p> Total </p>
          <p>{`$${SubTotal() + 15}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
