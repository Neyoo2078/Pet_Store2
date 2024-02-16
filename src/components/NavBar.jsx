import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import { PiHandbagSimple } from 'react-icons/pi';
import { CiSearch } from 'react-icons/ci';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { SetActiveUser } from '../lib/Redux/Reducers/ProductReducer';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { VscThreeBars } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import {
  CartItemFromLS,
  AddLSDbCart,
} from '../lib/Redux/Reducers/ProductReducer';
import { client } from '../lib/client';

const NavBar = () => {
  const [ActiveLink, setActiveLink] = useState('Home');
  const [loading, setloading] = useState(false);
  const NavLink = [
    { name: 'Home', path: '/' },
    { name: 'Browse Pet', path: '/Browse Pet' },
    { name: 'Terms and Condition' },
    { name: 'Contact' },
  ];
  const { cart, user } = useSelector((state) => state.Product);
  const [openNav, setopenNav] = useState(false);
  const [contain, setcontain] = useState(null);

  const container = useRef();
  const nav = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, isLoaded } = useAuth();
  const data = useUser();

  const DbCart = async () => {
    setloading(true);
    const exist = await client.fetch(
      `*[_type == "carts" && user_id == "${userId}"]{ _id,user_id,cart[]{quantity,age,id->}}`
    );

    if (exist?.length > 0) {
      const fetchcart = exist[0]?.cart?.map((items) => {
        return {
          quantity: parseInt(items?.quantity),
          description: items?.id.description,
          image: items?.id.image,
          age: parseInt(items?.id?.age),
          price: items?.id.price,
          product_details: items?.id.product_details,
          name: items?.id.name,
          _id: items?.id._id,
          _rev: items?.id._id,
          _type: items?.id._type,
        };
      });

      dispatch(AddLSDbCart(fetchcart));
    }
    setloading(false);
    if (exist.length === 0 && localStorage.getItem('local_cart')) {
      dispatch(CartItemFromLS(JSON.parse(localStorage.getItem('local_cart'))));
    }
  };

  const AddDbcart = async () => {
    const DbCart = cart?.map((items, i) => {
      return {
        _key: `${i}`,
        id: { _type: 'reference', _ref: items._id },
        quantity: items.quantity,
        age: items.age,
      };
    });

    const doc = { _type: 'carts', user_id: userId, cart: [...DbCart] };

    const exist = await client.fetch(
      `*[_type == "carts" && user_id == "${userId}"]`
    );

    if (exist.length === 0) {
      await client
        .create(doc)
        .then((res) => {
          console.log({ res });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      const doc2 = {
        _id: `${exist?._id}`,
        _type: 'carts',
        user_id: userId,
        cart: [...DbCart],
      };
      client.createOrReplace(doc2);
    }
  };

  useEffect(() => {
    if (userId) {
      DbCart();
      dispatch(SetActiveUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (userId && !loading) {
      AddDbcart();
    }
  }, [cart, userId, loading]);

  useEffect(() => {
    if (!userId && localStorage.getItem('local_cart')) {
      dispatch(CartItemFromLS(JSON.parse(localStorage.getItem('local_cart'))));
    }
  }, [userId]);

  return (
    <div
      ref={container}
      className="w-full min-h-[60px] flex flex-col  gap-2 relative py-4   border-[1px]"
    >
      <div className="w-[90%] m-auto h-full flex  justify-between">
        <div className="flex gap-4 items-center justify-center">
          {' '}
          <img
            src="pet_logo.png"
            alt="logo"
            className="w-[90px] h-[55px]"
            onClick={() => {
              navigate('/');
            }}
          />{' '}
          <h1 className="font-Nunitos hidden sm:block font-[300] text-[25px]">
            Pet Store
          </h1>
        </div>
        <div className=" hidden sm:flex gap-2 justify-center items-center">
          <div className="border-[1px] p-3 border-[#464646] h-[40px] w-[200px] flex items-center">
            <input placeholder="Search" className="outline-none w-[95%]" />
            <CiSearch className="w-[25px] h-[25px] text-black" />
          </div>
          <IoEllipsisVerticalOutline className="h-[55px] text-black" />
          <div
            onClick={() => {
              navigate('/cart');
            }}
            className="relative  w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
          >
            <PiHandbagSimple className="text-black w-[30px] h-[25px]" />
            {cart.length !== 0 && (
              <div className="bg-[#f04336] py-[1px] px-[5px]  rounded-full text-white absolute -top-[5px] right-0 flex items-center">
                <h4 className="text-[10px] ">
                  {cart?.reduce((a, b) => {
                    return (a += parseInt(b?.quantity));
                  }, 0)}
                </h4>
              </div>
            )}
          </div>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
        <div className="sm:hidden flex">
          {openNav ? (
            <IoMdClose
              onClick={() => {
                setopenNav(false);
              }}
              className="w-[35px] h-[35px] text-[#7a7979]"
            />
          ) : (
            <VscThreeBars
              onClick={() => {
                setopenNav(true);
              }}
              className="w-[35px] h-[35px] text-[#7a7979]"
            />
          )}
        </div>
      </div>
      <div className="flex sm:hidden sm:p-0 p-2 gap-2 justify-between items-center">
        <div className="border-[1px] p-3 border-[#464646] h-[40px] w-[85%] sm:w-[90%] flex items-center">
          <input placeholder="Search" className="outline-none w-[95%]" />
          <CiSearch className="w-[25px] h-[25px] text-black" />
        </div>

        <div
          onClick={() => {
            navigate('/cart');
          }}
          className="relative  w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
        >
          <PiHandbagSimple className="text-black w-[30px] h-[25px]" />
          {cart.length !== 0 && (
            <div className="bg-[#f04336] py-[1px] px-[5px]  rounded-full text-white absolute -top-[5px] right-0 flex items-center">
              <h4 className="text-[10px] ">
                {cart?.reduce((a, b) => {
                  return (a += parseInt(b?.quantity));
                }, 0)}
              </h4>
            </div>
          )}
        </div>
        <div className=" hidden sm:block">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </div>

      <div className=" hidden sm:block w-[90%] m-auto p-3">
        <ul className="flex gap-4">
          {NavLink.map((items, i) => (
            <li
              key={i}
              onClick={() => {
                setActiveLink(items.name);
                if (items.path) {
                  navigate(`${items.path}`);
                }
              }}
              className={`${
                items.name === ActiveLink && 'text-white bg-[#f04336]'
              } text-black text-[16px] rounded-[3px]  py-[8px] px-[14px] cursor-pointer transition-all`}
            >
              {items.name}
            </li>
          ))}
        </ul>
      </div>
      {openNav && container?.current && (
        <div
          style={{
            position: 'absolute',
            top: container?.current?.clientHeight,
            height: nav.current?.clientHeight,
          }}
          className={`w-full  bg-[#fff] border-t-[#f86060] md:hidden flex  border-[2px] absolute z-50   `}
        >
          <ul className="flex flex-col gap-2" ref={nav}>
            {NavLink.map((items, i) => (
              <li
                key={i}
                onClick={() => {
                  setActiveLink(items.name);
                  if (items.path) {
                    navigate(`${items.path}`);
                  }
                }}
                className={`${
                  items.name === ActiveLink ? 'text-[#f04336]' : 'text-black'
                }  text-[16px] rounded-[3px]  py-[4px] px-[14px] hover:text-[#f04336] transition-all`}
              >
                {items.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
