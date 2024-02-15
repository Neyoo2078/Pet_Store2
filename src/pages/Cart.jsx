import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Table from '../components/Table';
import { RemoveItemFromCart } from '../lib/Redux/Reducers/ProductReducer';

const Cart = () => {
  const { cart } = useSelector((state) => state.Product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const RemoveProduct = (id, age) => {
    const filteredCrt = cart.filter(
      (items) => items._id !== id || items.age !== age
    );
    dispatch(RemoveItemFromCart(filteredCrt));
  };
  if (cart.length === 0) {
    return <div>no item in cart</div>;
  }
  return (
    <div className="flex flex-col gap-9 w-full p-2 sm:w-[80%] mx-auto items-center">
      <table className="w-full mt-[60px]  text-[#424242] ">
        <thead className="border-none text-[#424242] font-[200]">
          <tr>
            <th className="py-2 px-4 text-[#424242] font-[600]">Items</th>
            <th className="py-2 px-4 text-[#424242] font-[600]">Quantity</th>
            <th className="py-2 px-4 text-[#424242] font-[600]">Subtotal</th>
            <th className="py-2 px-4 text-[#424242] font-[600]">Remove</th>
          </tr>
        </thead>
        {cart.map((items, i) => (
          <Table key={i} items={items} RemoveProduct={RemoveProduct} />
        ))}
      </table>
      <div className="flex w-full justify-between  p-5">
        <button
          onClick={() => {
            navigate('/');
          }}
          className="px-[24px] text-[#f04336] hover:text-white transition-colors  duration-[250ms] hover:bg-[#e0564c] py-[4px] border-[1px] border-[#f04336]"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => {
            navigate('/checkout');
          }}
          className="px-[24px] text-[#fff] py-[4px] border-[1px] border-[#f04336] bg-[#e0564c]"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
