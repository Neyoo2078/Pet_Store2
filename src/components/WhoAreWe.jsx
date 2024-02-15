import React from 'react';

const WhoAreWe = () => {
  const ImageList = [
    { url: 'zwstock-image-89.jpg' },
    { url: 'zwstock-image-90.jpg' },
    { url: 'zwstock.jpg' },
    { url: 'parrot.jpg' },
    { url: 'rabbit.jpg' },
  ];
  return (
    <div className="text-[#222d90]  bg-[rgb(247,247,245)] py-[30px] w-full sm:h-[717px]  flex items-center  relative ">
      <div className=" w-full p-2 sm:w-[80%] pt-[50px] sm:pt-[0px] flex sm:flex-row flex-col gap-10 h-full m-auto justify-center items-center">
        <img
          src="/dog.png"
          alt="who are we photo"
          className="sm:w-[540px] sm:h-[623px] w-full h-[436px] "
        />
        <div className="sm:w-[553px] sm:h-[349px] w-full flex p-3 sm:p-[0px]  flex-col gap-6  ">
          <p className="sm:text-[45px] text-[35px] w-full sm:w-[70%] font-semibold leading-[45px] text-black  font-Nunitos ">
            {' '}
            Who are we?
          </p>
          <p className="text-[16px] text-[#373737] font-Roboto">
            We are an organisation that puts pets at the heart of what we do. We
            are passionate about animal welfare, and provide rehabilitation,
            support and shelter to them till they find their forever homes.
          </p>
          <div className="hidden sm:flex gap-1">
            {ImageList.map((items, i) => (
              <img
                key={i}
                src={items.url}
                alt="photo"
                className="sm:w-[112.5px] sm:h-[112.5px] w-full h-[345px]"
              />
            ))}
          </div>
          <div className="flex flex-col sm:hidden gap-1">
            {ImageList.slice(0, 3).map((items, i) => (
              <img
                key={i}
                src={items.url}
                alt="photo"
                className="sm:w-[112.5px] sm:h-[112.5px] w-full h-[345px]"
              />
            ))}
          </div>
          <button className="w-[149px] h-[40px] bg-[#f04336] text-white">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
