import React from 'react';
import { urlFor } from '../lib/client';
import { useNavigate } from 'react-router-dom';
import { BsArrowsFullscreen, BsCart2 } from 'react-icons/bs';
import { TbMinusVertical } from 'react-icons/tb';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductReducer, {
  ModalItem,
} from '../lib/Redux/Reducers/ProductReducer';
import Modal from './Modal';

const Product = ({ items, index }) => {
  const [HoverProduct, setHoverProduct] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productReducer = (e) => {
    e.stopPropagation();
    navigate(`productdetails/${items._id}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        onMouseEnter={() => {
          setHoverProduct(true);
        }}
        onMouseLeave={() => {
          setHoverProduct(false);
        }}
        onClick={productReducer}
        className="sm:w-[349.99px] sm:h-[349.99px] w-[167px]  h-[182px] mt-2 bg-[#291b70] relative"
      >
        {HoverProduct && (
          <div className="absolute w-[120px] h-[60px] hidden  sm:flex items-center gap-3 justify-center p-2 bg-slate-100  left-[120px] top-[140px]">
            <BsArrowsFullscreen
              onClick={(e) => {
                e.stopPropagation();
                dispatch(ModalItem(items));
              }}
              className="w-[20px] h-[20px] text-[#424242] cursor-pointer"
            />

            <div className="h-[20px] border-[1px] border-[#424242]" />
            <BsCart2
              onClick={productReducer}
              className="w-[25px] h-[25px] text-[#424242] cursor-pointer"
            />
          </div>
        )}
        <img
          src={urlFor(items.image[0].asset._ref)}
          className="w-full h-full"
        />
      </div>
      <p>{items.name}</p>
      <p>{items.price}</p>
    </div>
  );
};

export default Product;
