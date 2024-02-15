import React, { useEffect, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import Form from '../components/form';
import { useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { client } from '../lib/client';
import Dispatch from '../components/Dispatch';
import Payment from '../components/Payment';

import Spinner from '../components/Loader';

const DashboardPage = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [Slide, setSlide] = useState({ offset: '190', width: '57' });
  const [initialValues, setinitialValues] = useState(null);
  const [Active, setActive] = useState('address');
  const [Loading, setLoading] = useState(false);

  const { cart, user } = useSelector((state) => state.Product);

  React.useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    }
  }, [navigate, userId]);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const DbUserAddress = async () => {
    setLoading(true);
    const res = await client.fetch(
      `*[_type == "user_address" && user_id == "${user}"]`
    );

    setinitialValues(res[0]);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      DbUserAddress();
    }
  }, [user]);

  useEffect(() => {
    if (initialValues) {
      setActive('payment');
    }
  }, [Loading]);

  useEffect(() => {
    if (Active === 'address') {
      setSlide({
        offset: ref1.current.offsetLeft,
        width: ref1.current.clientWidth,
      });
      return;
    }
    if (Active === 'dispatch') {
      setSlide({
        offset: ref2.current.offsetLeft,
        width: ref2.current.clientWidth,
      });
      return;
    }
    if (Active === 'payment') {
      setSlide({
        offset: ref3.current.offsetLeft,
        width: ref3.current.clientWidth,
      });
      return;
    }
  }, [Active]);

  if (!isLoaded) return 'Loading...';

  if (Loading)
    return (
      <>
        <Spinner color="#f04336" />
      </>
    );

  return (
    <div className="w-full flex flex-col pb-[60px]">
      <div className="w-[80%] m-auto flex flex-col gap-3 ">
        <div className="flex items-center gap-1 mt-[40px]">
          <Link className="text-[#f04336] text-[14px]" to="/">
            Home
          </Link>
          <IoChevronForward />
          <Link className="text-[#f04336] text-[14px]" to="/cart">
            View Cart
          </Link>
          <IoChevronForward className="text-[#424242] font-[100]" />
          <Link className=" text-[14px]">Check Out</Link>
        </div>
        <div className="w-full flex justify-center my-10 ">
          <div className="w-[70%]  flex flex-col ">
            <div className="w-full sm:flex relative hidden gap-2  items-center justify-center ">
              <div ref={ref1}>Address</div>
              <hr className=" border-dashed w-[50px] border-[1px]" />
              <div ref={ref2}>Dispatch</div>
              <hr className=" border-dashed w-[50px] border-[1px]" />
              <div ref={ref3}>Review Order & Make Payment</div>
            </div>
            <hr
              style={{
                width: `${Slide.width}px`,
                borderColor: '#f04336',
                borderWidth: '2px',
                transform: `translateX(${Slide.offset}px)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            />
          </div>
        </div>
        {Active === 'address' && (
          <Form
            userId={userId}
            initialValues={initialValues}
            setActive={setActive}
          />
        )}
        {Active === 'dispatch' && (
          <Dispatch
            userId={userId}
            initialValues={initialValues}
            setActive={setActive}
          />
        )}
        {Active === 'payment' && (
          <Payment
            userId={userId}
            initialValues={initialValues}
            setActive={setActive}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
