import React from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../lib/client';
import { urlFor } from '../lib/client';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoAddSharp } from 'react-icons/io5';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { TiSocialPinterest, TiSocialFacebook } from 'react-icons/ti';
import Rating from '../components/Rating';
import { PiWhatsappLogoThin } from 'react-icons/pi';
import Product from '../components/Product';
import {
  CartItem,
  ModifyExistingCartItem,
} from '../lib/Redux/Reducers/ProductReducer';

const ProductDetails = () => {
  const [product, setproduct] = useState(null);
  const [Age, setAge] = useState(null);

  const [Quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { cart, AllProduct } = useSelector((state) => state.Product);

  const { id } = useParams();
  const fetchProductDetails = async () => {
    const res = await client.fetch(`*[_type == "product" && _id == "${id}"]`);
    setproduct(res[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

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
    const res = await client.fetch(`*[_type == "product" && _id == "${id}"]`);

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
  return (
    <div className="w-full pt-[50px] flex-col gap-[60px] ">
      <div className="m-auto sm:w-[80%] w-full flex  sm:flex-row flex-col">
        <div className="sm:w-[555px] w-full flex p-7 sm:p-0 border-b-[1px] justify-center flex-col items-center">
          {product && (
            <img
              src={urlFor(product?.image[0]?.asset._ref)}
              alt="photo"
              className="sm:w-[530px] sm:h-[530px] w-[275px] h-[275px]"
            />
          )}
          <div className=" grid grid-cols-3 sm:flex flex-wrap w-full gap-3 my-[10px]  justify-center">
            {product?.image?.slice(1).map((item, i) => (
              <img
                key={i}
                src={urlFor(item?.asset._ref)}
                alt="photo"
                className="sm:w-[254.4px] sm:h-[254.4px] w-[100px] h-[100px]"
              />
            ))}
          </div>
        </div>
        <div className="sm:w-[50%] w-full p-5  flex flex-col gap-3">
          <h3 className="font-Nunitos text-[20px] ">{product?.name}</h3>
          <div className="w-[113.79px] h-[23px] py-[5px] flex items-center px-[10px] bg-[#f04336] text-center rounded-[5px] text-[#fff] text-[13px]">
            <p>Non-refundable</p>
          </div>
          <p className="text-[#212121] text-[24px] font-sans">
            {product?.price}
          </p>
          <p className="text-[#212121]  font-sans text-[16px]">
            {product?.description}
          </p>
          <div className="flex gap-2">
            <div className="w-[30px] h-[30px] bg-[#cc2127] text-[#fff]">
              <TiSocialPinterest className="w-full h-full rounded-[3px]" />
            </div>
            <div className="w-[30px] h-[30px] bg-[#25d366] text-[#fff]">
              <PiWhatsappLogoThin className="w-full h-full rounded-[3px]" />
            </div>
            <div className="w-[30px] h-[30px] bg-[#3b5998] text-[#fff]">
              <TiSocialFacebook className="w-full h-full rounded-[3px]" />
            </div>
          </div>
          <div>
            <p>{'Age(yrs)'}</p>
            <div className="flex my-[5px] border-[#424242]">
              {product?.age?.map((items, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setAge(items);
                  }}
                  className={`${
                    items === Age && 'border-[#f04336]'
                  } text-[20px] border-[1px] w-[40px] h-[40px] flex items-center justify-center`}
                >
                  {items}
                </div>
              ))}
            </div>
            <div className="flex mt-[20px] flex-col gap-2">
              <p>Choose Quantity</p>
              <div className="flex sm:flex-row flex-col gap-2 items-start justify-start sm:items-center">
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
                  className="sm:w-[220px] w-full h-[50px] bg-[#f04336] text-[#ffffff] flex items-center justify-center "
                >
                  <IoAddSharp className="text-[#ffffff]" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto sm:p-0 p-3 sm:w-[80%] w-full sm:my-[80px]  flex flex-col">
        <div className="sm:w-[135px] w-full sm:h-[50.4px] flex justify-center items-center text-[#f04336] text-center bg-[#f7f7f5]">
          <p>Product Details</p>
        </div>
        <div className="sm:h-[132px] w-full border-[1px] flex items-center justify-center p-5">
          <p className="text-[16px] font-sans ">{product?.product_details}</p>
        </div>
        <Rating rating={product?.ratings} />
        <div className="w-full  h-full m-auto ">
          {' '}
          <p className="font-Nunitos text-[#424242] text-[30px] my-[20px]">
            Recommended Products
          </p>
          {AllProduct.length > 0 && (
            <div className="grid sm:grid-cols-3 grid-cols-2 w-full gap-1 justify-center items-start sm:items-center">
              {AllProduct.filter((items) => items._id !== id)
                .slice(0, 3)
                .map((items, i) => (
                  <div key={i}>
                    <Product items={items} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
