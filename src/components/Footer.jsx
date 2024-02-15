import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#212121] w-full  p-[30px] sm:p-0 sm:h-[323px] flex items-center">
      <div className="w-[80%] m-auto flex gap-4 sm:gap-0 sm:flex-row flex-col  ">
        <div className=" flex flex-col  gap-7 text-white">
          <div className=" w-full sm:w-[445px] flex flex-col gap-4">
            <h1 className="text-[24px]">Pet Shelther</h1>
            <p className="text-[16px]">
              The affordable option to adopt your new best friend. Our pets are
              cared for, ethically treated and will bring joy to your life.
            </p>
            <div className="flex gap-2 items-center"></div>
          </div>
          <div className="w-[160px] flex gap-4 items-center">
            <div className="bg-[#316FF6] w-[38px] h-[38px] rounded-full flex items-center justify-center">
              <FaFacebookF className="text-white text-[22px]" />
            </div>
            <div className="bg-[#1DA1F2] w-[38px] h-[38px] rounded-full flex items-center justify-center">
              <FaTwitter className="text-white text-[22px]" />
            </div>
            <div className="bg-[#0072b1] w-[38px] h-[38px] rounded-full flex items-center justify-center">
              <FaLinkedinIn className="text-white text-[22px]" />
            </div>
          </div>
        </div>
        <div className="w-[160px] flex flex-col gap-3  items-start sm:items-center sm:px-[30px] ">
          <h1 className="text-[14px] text-white">Quick Links</h1>
          <div>
            <ul className="text-[16px] text-white">
              <li>About</li>
              <li>Home</li>
              <li>Browse Pet</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="w-[160px] flex flex-col gap-3 sm:px-[30px] items-start sm:items-center ">
          <h1 className="text-[14px] text-white font-[700]">Quick Links</h1>
          <div>
            <ul className="text-[16px] text-white">
              <li>About</li>
              <li>Home</li>
              <li>Browse Pet</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="w-[225px] text-white flex flex-col  items-start sm:items-center ">
          <div className="flex flex-col justify-start gap-3">
            <h1 className="text-[14px] text-white font-[500]">Contact</h1>

            <p>703-612-8229</p>
            <p>1673 Golf Course Drive </p>
            <p>Virginia, USA 22370</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
