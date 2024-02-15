import React from 'react';
import Hero from '../components/Hero';
import WhoAreWe from '../components/WhoAreWe';
import Products from '../components/Products';
import { client } from '../lib/client';
import { useEffect, useState } from 'react';
import Activities from '../components/Activities';
import Modal from '../components/Modal';
import { AddProduct } from '../lib/Redux/Reducers/ProductReducer';
import { useDispatch } from 'react-redux';
const Home = () => {
  const [AllProducts, setAllProducts] = useState([]);

  const dispatch = useDispatch();
  const fetchSanityData = async () => {
    const productQuery = '*[_type == "product"]';
    const product = await client.fetch(productQuery);
    setAllProducts(product);
    dispatch(AddProduct(product));
  };

  useEffect(() => {
    fetchSanityData();
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Hero />
      <WhoAreWe />
      <Products AllProducts={AllProducts} />
      <Activities />
      <Modal />
    </div>
  );
};

export default Home;
