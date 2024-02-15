import React from 'react';
import { useState, useEffect } from 'react';
import { client } from '../lib/client';
import Product from '../components/Product';
import Loader from '../components/Loader';

const BrowswPet = () => {
  const Optionss = [
    { name: 'Most Popular', query: 'Most Popular' },
    { name: 'Most Recent', query: 'Most Recent' },
    { name: 'Price: High to Low', query: 'High to Low' },
    { name: 'Price: Low to High', query: 'Low to High' },
    { name: 'A-Z', query: 'A-Z' },
    { name: 'Z-A', query: 'Z-A' },
  ];

  const [filterr, setfilterr] = useState('Most Popular');
  const [FetchP, setFetchP] = useState([]);
  const [loading, setloading] = useState(false);

  console.log(filterr);
  //   const authors = await client.fetch('*[_type == "author"]')
  // // order todo items by descending priority,
  // where priority is equal, list most recently updated
  // item first
  // *[_type == "todo"] | order(priority desc, _updatedAt desc)
  // order results alphabetically by a string field
  // This is case sensitive, so A-Z come before a-z
  // ignoring case
  // *[_type == "movie"] | order(lower(title) asc)
  // order results by multiple attributes
  // *[_type == "movie"] | order(releaseDate desc) | order(_createdAt asc)\

  const FetchProduct = async (query) => {
    const res = await client.fetch(query);

    setFetchP(res);
  };

  useEffect(() => {
    switch (filterr) {
      case 'Most Popular':
        FetchProduct('*[_type == "product"]');
        break;
      case 'Most Recent':
        FetchProduct('*[_type == "product"] | order( _updatedAt desc)');
        break;

      case 'Price: High to Low':
        FetchProduct('*[_type == "product"] | order(price desc)');
        break;
      case 'Price: Low to High':
        FetchProduct('*[_type == "product"] | order(price asc)');
        break;
      case 'A-Z':
        FetchProduct('*[_type == "product"] | order(name asc)');
        break;
      case 'Z-A':
        FetchProduct('*[_type == "product"] | order(name desc)');
        break;

      default:
        FetchProduct('*[_type == "product"]');
        break;
    }
  }, [filterr]);

  const HandleSelect = (e) => {
    setfilterr(e.target.value);
  };

  if (!FetchP || FetchP.length === 0) {
    return (
      <>
        <Loader color="#f04336" />
      </>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <div className="w-[80%] min-h-[300px] flex flex-col gap-3 ">
        <div className="w-full bg-[#F7F7F5] p-[20px] ">
          <h1>Browse Pet</h1>
        </div>
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <h1>Category:</h1>
            <div className="border-[1px]">
              <select className="p-[10px]">
                {Optionss.map((items, i) => (
                  <option key={i}>{items.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1>Sort By:</h1>
            <div className="border-[1px]">
              <select onClick={HandleSelect} className="p-[10px]">
                {Optionss.map((items, i) => (
                  <option key={i}>{items.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className=" w-full p-9">
          {FetchP.length > 0 && (
            <div className="grid grid-cols-3 gap-1 w-full">
              {FetchP.map((items, i) => (
                <Product items={items} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowswPet;
