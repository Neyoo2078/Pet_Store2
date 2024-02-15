import React from 'react';

const Hero = () => {
  return (
    <div className="text-[#222d90] w-full h-[717px] bg-[rgb(47,98,181)] flex items-start sm:items-center  relative ">
      <div className=" w-full  sm:w-[553px] h-[329px] flex flex-col gap-6 p-[20px] sm:p-[0px] sm:ml-[120px]">
        <p className=" text-[40px] sm:text-[45px] w-full sm:w-[70%] font-semibold leading-[45px] text-white  font-Nunitos ">
          Save Animals, Change Lives.
        </p>

        <p className="text-[16px] text-white font-Roboto">
          We care for every pet till they find their forever home. Adopt healthy
          pets from our store, and bring positive change around you.
        </p>
        <button className="w-[149px] h-[40px] bg-[#f04336] text-white">
          Browse Pets
        </button>
      </div>

      <img
        src="/stock-image.png"
        className="sm:w-[523px]  sm:h-[665px] w-[311px] h-[396px] absolute right-[50px] -bottom-[45px] z-40"
      />
    </div>
  );
};

export default Hero;
