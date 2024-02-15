import React from 'react';

const ShippingAddress = ({ initialValues, setActive, tab }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1>Shipping Address</h1>
      <div className="flex">
        <div className="flex flex-col gap-2 w-[90%]">
          <p className="text-[15px] font-semibold">
            {initialValues.firstname} {initialValues.lastname}
          </p>
          <p className="text-[15px]">{initialValues.address}</p>
          <p className="text-[15px]">{initialValues.telephone}</p>
        </div>
        <div className="w-[10%]">
          <button
            onClick={() => {
              setActive('address');
            }}
            className={`w-[66px] text-[13px] justify-center items-center  h-[34px] flex gap-3 text-[#f04336]  border-[1px] border-[#f04336]  `}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
