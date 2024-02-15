import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { ModalItem } from '../lib/Redux/Reducers/ProductReducer';
import { urlFor } from '../lib/client';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoAddSharp } from 'react-icons/io5';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { client } from '../lib/client';
import {
  CartItem,
  ModifyExistingCartItem,
} from '../lib/Redux/Reducers/ProductReducer';

const Modal = () => {
  const { ModalProduct, cart } = useSelector((state) => state.Product);

  const [Age, setAge] = useState(null);

  const [Quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const AddQuantity = (e) => {
    e.stopPropagation();
    let count = Quantity;
    count++;
    setQuantity(count);
  };
  const ReduceQuantity = (e) => {
    e.stopPropagation();
    if (Quantity === 1) {
      return;
    }
    let count = Quantity;
    count--;
    setQuantity(count);
  };

  const AddToCart = async () => {
    const res = await client.fetch(
      `*[_type == "product" && _id == "${ModalProduct._id}"]`
    );

    const {
      _id,
      _type,
      _rev,
      product_details,
      price,
      name,
      image,
      description,
    } = res[0];

    if (Quantity > res[0].inStock) {
      console.log('Quantity exceed amount in stock');
      return;
    }
    if (!Age) {
      console.log('Please select age');
      return;
    }

    const exist = cart?.find(
      (items) => items?._id === res[0]?._id && items.age === Age
    );

    if (!exist) {
      dispatch(
        CartItem({
          _id,
          _type,
          _rev,
          product_details,
          price,
          name,
          image,
          description,
          quantity: Quantity,
          age: Age,
        })
      );
    } else {
      if (exist && exist.age === Age) {
        const newQuantity = exist.quantity + Quantity;
        if (newQuantity > res[0].inStock) {
          console.log('Quantity exceed amount in stock');
          return;
        }
        dispatch(
          ModifyExistingCartItem({
            _id: exist._id,
            quantity: newQuantity,
            age: Age,
          })
        );
      }
    }
  };

  useEffect(() => {
    // Change the overflow property of the body based on the state
    if (ModalProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [ModalProduct]);

  if (!ModalProduct) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-[#000000d0]  w-full flex justify-center">
      <div className="bg-[#fff] mt-6  w-[800px] z-50  h-[612px] p-7 relative">
        <IoMdClose
          onClick={() => {
            dispatch(ModalItem(null));
            setAge(null);
            setQuantity(1);
          }}
          className="w-[25px] h-[25px] text-[#424242] absolute top-2 right-2"
        />

        <div className="w-full h-full  flex py-[25px]">
          <div className="w-[50%] h-ful flex gap-2  items-start flex-col">
            <img
              className="w-[345px] h-[345px]"
              src={urlFor(ModalProduct.image[0].asset._ref)}
            />
            <div className="w-full grid grid-cols-3 gap-1">
              {ModalProduct.image.map((items, i) => (
                <div
                  key={i}
                  className="w-[110px] h-[95px] hover:border-[1px] border-[#9a9a9a] flex items-center justify-center"
                >
                  <div className="w-[79.4px] h-[79.4px] relative">
                    <img
                      src={urlFor(items.asset._ref)}
                      className="w-full h-full "
                    />
                    <div className="absolute inset-0 w-full h-full bg-[#ffffff62]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%] p-5 border-l-[1px] border-[#9a9a9a] flex flex-col gap-3">
            <h3 className="font-Nunitos text-[20px] ">{ModalProduct.name}</h3>
            <div className="w-[113.79px] h-[23px] py-[5px] flex items-center px-[10px] bg-[#f04336] text-center rounded-[5px] text-[#fff] text-[13px]">
              <p>Non-refundable</p>
            </div>
            <p className="text-[#212121] text-[24px] font-sans">
              {ModalProduct.price}
            </p>
            <p className="text-[#212121]  font-sans underline text-[16px]">
              View this product's full detail
            </p>
            <div>
              <p>{'Age(yrs)'}</p>
              <div className="flex my-[5px] border-[#424242]">
                {ModalProduct.age.map((items, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setAge(items);
                    }}
                    className={`${
                      items === Age && 'border-[#f04336]'
                    } text-[20px] border-[1px] w-[40px] cursor-pointer h-[40px] flex items-center justify-center`}
                  >
                    {items}
                  </div>
                ))}
              </div>
              <div className="flex mt-[20px] flex-col gap-2">
                <p>Choose Quantity</p>
                <div className="flex gap-2 justify-center items-center">
                  <div className="flex">
                    <div
                      onClick={ReduceQuantity}
                      className="border-[#424242] border-[1px] w-[30px] h-[40px] flex items-center justify-center"
                    >
                      <MdKeyboardArrowDown className="w-[20px] h-[20px] cursor-pointer" />
                    </div>
                    <div className="border-[#424242] font-sans border-[1px] w-[40px] h-[40px] flex items-center justify-center">
                      {Quantity}
                    </div>
                    <div className="border-[#424242] border-[1px] w-[30px] h-[40px] flex items-center justify-center">
                      <MdKeyboardArrowUp
                        onClick={AddQuantity}
                        className="w-[20px] h-[20px] cursor-pointer"
                      />
                    </div>
                  </div>
                  <button
                    onClick={AddToCart}
                    className="w-[220px] h-[50px] bg-[#f04336] text-[#ffffff] flex items-center justify-center "
                  >
                    <IoAddSharp className="text-[#ffffff]" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
