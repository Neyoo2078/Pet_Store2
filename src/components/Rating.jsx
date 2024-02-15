import React from 'react';
import { Fa500Px, FaStar } from 'react-icons/fa';

const Rating = ({ rating }) => {
  return (
    <div className="flex flex-col items-start mt-[60px] gap-3">
      <h4 className="text-[#424242] font-Nunitos text-[18px]">Ratings</h4>
      <div className="flex gap-2 justify-center">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <h4 className="text-[#424242] font-Nunitos text-[18px]">
        {'0.0/5 (No Ratings)'}
      </h4>
      <h4 className="text-[#424242] font-Nunitos text-[18px]">Reviews</h4>
      <h4 className="text-[#424242] font-Nunitos text-[18px]">
        There aren't any reviews to display.
      </h4>
      <h4 className="text-[#424242] font-Nunitos text-[18px]">
        Only Verified Buyer can review
      </h4>
    </div>
  );
};

export default Rating;
