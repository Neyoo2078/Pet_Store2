import React from 'react';
import { SquareLoader } from 'react-spinners';

const Loader = ({ color }) => {
  return (
    <div className="w-full pt-[60px] min-h-[300px] flex justify-center">
      <SquareLoader color={color} />
    </div>
  );
};

export default Loader;
