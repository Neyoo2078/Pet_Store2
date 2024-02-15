import React from 'react';
import Product from './Product';
import { useState } from 'react';
import Loader from './Loader';

const Products = ({ AllProducts }) => {
  const [Loading, setLoading] = useState(true);

  if (AllProducts.length === 0) {
    return (
      <>
        <Loader color="#f04336" />
      </>
    );
  }

  return (
    <div className="bg-white py-[15px] sm:py-[30px] w-full flex flex-col items-center">
      <div className="sm:w-[75%] w-full  h-full m-auto ">
        {' '}
        <p className="font-Nunitos text-[#424242] text-[20px] sm:text-[30px] my-[20px]">
          {' '}
          All Products
        </p>
        {AllProducts.length > 0 && (
          <div className="grid grid-cols-2 p-2 sm:p-0 sm:grid-cols-3 w-full gap-4 sm:gap-8 justify-center sm:items-center items-start">
            {AllProducts.map((items, i) => (
              <div key={i}>
                <Product items={items} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-[444.2px] flex items-center bg-learnMore px-[10px] bg-no-repeat bg-center sm:bg-cover mt-[50px]">
        <div className="sm:w-[553px] w-full h-[329px] flex flex-col gap-6  justify-center  sm:ml-[120px]">
          <h1 className="text-[35px] w-[90%] font-semibold leading-[45px] text-white  font-Nunitos ">
            {' '}
            We love to pamper your pets
          </h1>
          <p className="text-[16px] text-white font-Roboto">
            Bring your pets in for some personalized care. We treat them to
            goodies, take them on nice walks, or let them swim in our pool. We
            also provide special brushing and grooming services.
          </p>
          <button className="w-[149px] h-[40px] bg-[#f5f3f3] text-[#f06363]">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
