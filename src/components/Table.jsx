import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { urlFor } from '../lib/client';

const Table = ({ items, RemoveProduct }) => {
  return (
    <tbody>
      <tr className="border-t border-b ">
        <td className="sm:py-2 sm:px-4 justify-start  sm:flex-row flex-col  flex gap-4">
          <img
            src={urlFor(items?.image[0].asset._ref)}
            alt="itemsPhoto"
            className="w-[110px] h-[110px]"
          />
          <div className="flex flex-col items-start justify-center gap-1">
            <h4>{items.name}</h4>
            <h4>{`Age(yrs): ${items.age}`}</h4>
            <h4>${items.price}</h4>
          </div>
        </td>
        <td className="py-2 px-4  text-center">{items.quantity}</td>
        <td className="py-2 px-4  text-center">
          {items.quantity * items.price}
        </td>
        <td className="py-2 px-4  ">
          <BsTrash
            className="text-[#f04336] m-auto"
            onClick={() => {
              RemoveProduct(items._id, items.age);
            }}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default Table;
