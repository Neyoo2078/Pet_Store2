import React from 'react';

const Activities = () => {
  return (
    <div className="bg-white py-[30px] w-full flex flex-col gap-11 items-center">
      <div className=" w-[90%] sm:w-[75%] h-full m-auto  flex flex-col sm:flex-row gap-2 ">
        <div className=" w-full items-start sm:w-[540px]  sm:h-[632.1px] flex flex-col gap-3">
          <h4 className="font-Nunitos text-[14px] text-[#ff0044]">
            Activities
          </h4>
          <h2 className="font-Nunitos text-[30px] text-[#424242] font-[700]">
            Putting Animals First
          </h2>{' '}
          <p className="text-[16px] font-sans">
            With an aim to rehabilitate pets and place them with caring owners,
            we offer a safe shelter for all kinds of animals and are actively
            involved in animal rights communities. When you adopt from us,
            you'll be taking home a well-cared for and well-fed pet.
          </p>
          <div className=" flex flex-col sm:grid grid-cols-1 w-full  items-center justify-center sm:grid-cols-2 gap-3">
            <img
              src="/zwstock-image-93.svg"
              alt="foto"
              className="sm:w-[250px] sm:h-[130.63px] w-[285px] h-[145px] "
            />
            <img
              src="/zwstock-image-94.svg"
              alt="foto"
              className="sm:w-[250px] sm:h-[130.63px] w-[285px] h-[145px] "
            />
            <img
              src="/zwstock-image-95.svg"
              alt="foto"
              className="sm:w-[250px] sm:h-[130.63px] w-[285px] h-[145px] "
            />
            <img
              src="/zwstock-image-96.svg"
              alt="foto"
              className="sm:w-[250px] sm:h-[130.63px] w-[285px] h-[145px] "
            />
          </div>
        </div>
        <div className="sm:w-[540px] w-full  h-[490px] py-[20px] sm:h-[632.1px] flex flex-col gap-3 bg-ActivityPhoto bg-contain bg-no-repeat"></div>
      </div>
      <div className="w-[75%] h-full m-auto flex items-center sm:items-start  flex-col  sm:flex-row gap-2 ">
        <div className="w-[254px]  flex flex-col gap-2">
          <img src="/zwstock-image-97.jpg " alt="foto" />
          <img src="/zwstock-image-100.jpg " alt="foto" />
          <img src="/zwstock-image-102.jpg " alt="foto" />
        </div>
        <div className="w-[540px] h-[931px] flex  flex-col gap-2 ">
          <img src="/zwstock-image-98.jpg " alt="foto" />
          <div className="w-[540px] h-[231.8px] bg-[#F04336] flex justify-center items-center ">
            <div className="w-[36px]  h-[36px] bg-white after:m-auto after:block "></div>
          </div>
          <img src="/zwstock-image-103.jpg " alt="foto" />
        </div>
        <div className="w-[254px] justify-center  flex flex-col gap-2">
          <img src="/zwstock-image-99.jpg " alt="foto" />
          <img src="/zwstock-image-101.jpg " alt="foto" />
          <img src="/zwstock-image-104.jpg " alt="foto" />
        </div>
      </div>
    </div>
  );
};

export default Activities;
