import React from 'react';
import { MoonLoader } from 'react-spinners';
import { useState, useEffect } from 'react';

import { client } from '../lib/client';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { CitySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { validate } from '../lib/validation';

const Form = ({ userId, initialValues, setActive }) => {
  const [countryid, setCountryid] = useState(161);
  const [stateid, setstateid] = useState(0);
  const [Loading, setLoading] = useState(false);
  const { cart, user } = useSelector((state) => state.Product);

  const SubTotal = () => {
    const Total = cart.reduce((a, b) => {
      return (a += b.quantity * b.price);
    }, 0);

    return Total;
  };

  const formik = useFormik({
    initialValues: {
      firstname: initialValues?.firstname ? initialValues?.firstname : '',
      lastname: initialValues?.lastname ? initialValues?.lastname : '',
      email: initialValues?.email ? initialValues?.email : '',
      address: initialValues?.address ? initialValues?.address : '',
      zipcode: initialValues?.zipcode ? initialValues?.zipcode : '',
      telephone: initialValues?.telephone ? initialValues?.telephone : '',
      state: null,
      city: null,
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      const doc = {
        _type: 'user_address',
        user_id: userId,
        ...values,
      };
      const exist = await client.fetch(
        `*[_type == "user_address" && user_id == "${user}"]`
      );

      if (exist.length === 0) {
        await client.create(doc);
      } else {
        client.createOrReplace({ ...doc, _id: exist[0]._id });
      }
      setActive('dispatch');
    },
  });

  return (
    <div className="w-full m-auto flex  gap-3 ">
      <div className="w-[60%]">
        <form
          onSubmit={formik?.handleSubmit}
          className="flex flex-col mt-[40px] gap-3"
        >
          <div className="flex gap-5  items-center">
            <div className="flex flex-col gap-3">
              <label htmlFor="firstname" className="text-[14px]">
                First Name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                onChange={formik?.handleChange}
                value={formik?.values.firstname}
                className="border-[1px] text-[16px] block w-[349px] p-[8px] outline-none"
              />
              <div className=" text-[15px] text-[#e75f5f] w-[349px] h-[30px]">
                {formik?.errors.firstname ? (
                  <div>{formik?.errors.firstname}</div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="lastname" className="text-[14px]">
                Last Name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                onChange={formik?.handleChange}
                value={formik?.values.lastname}
                className="border-[1px] text-[16px] w-[349px] p-[8px] outline-none"
              />
              <div className=" text-[15px] text-[#e75f5f] w-[349px]  h-[30px]">
                {formik?.errors.lastname ? (
                  <div>{formik?.errors.lastname}</div>
                ) : null}
              </div>
            </div>
          </div>
          <label htmlFor="email" className="text-[14px]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik?.handleChange}
            value={formik?.values.email}
            className="border-[1px] text-[16px] w-[729px] p-[8px] outline-none"
          />
          <label htmlFor="email" className="text-[14px]">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            type="text"
            onChange={formik?.handleChange}
            value={formik?.values.address}
            className="border-[1px] text-[16px] w-[729px] h-[97.6px] p-[8px] outline-none resize-none"
          />
          <div className="flex gap-5  items-center">
            <div className="flex flex-col gap-3 w-[349px]">
              <h6 className="text-[15px]">Country</h6>
              <h3>Nigeria</h3>
            </div>
            <div className="flex flex-col gap-3">
              <h6>State</h6>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e.id);

                  formik.values.state = e.name;
                }}
                placeHolder="Select State"
                containerClassName="countryy"
                inputClassName="countryinput"
              />
              <div className=" text-[15px] text-[#e75f5f] w-[349px]  h-[30px]">
                {formik?.errors.state && !formik?.values.state ? (
                  <div>{formik?.errors.state}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex gap-5  items-start">
            <div className="flex flex-col gap-3">
              <h6>City</h6>
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  formik.values.city = e.name;
                }}
                placeHolder="Select City"
                containerClassName="countryy"
                inputClassName="countryinput"
              />
              <div className=" text-[15px] text-[#e75f5f] w-[349px]  h-[30px]">
                {formik?.errors.city && !formik?.values.city ? (
                  <div>{formik?.errors.city}</div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="lastname" className="text-[14px]">
                Zip Code
              </label>
              <input
                id="zipcode"
                name="zipcode"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.zipcode}
                className="border-[1px] text-[16px] w-[349px] p-[8px] outline-none"
              />
            </div>
          </div>

          <label htmlFor="email" className="text-[14px]">
            Telephone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="text"
            onChange={formik?.handleChange}
            value={formik?.values.telephone}
            className="border-[1px] text-[16px] w-[729px] p-[8px] outline-none"
          />

          <button
            className={`px-[24px] w-[154px] items-center  h-[40px] flex gap-3 text-[#fff] py-[4px] border-[1px] border-[#f04336] ${
              Loading ? 'bg-[#d0766f]' : 'bg-[#f04336]'
            } `}
            type="submit"
            disabled={Loading}
          >
            Continue{Loading && <MoonLoader size={15} color="#fff" />}
          </button>
        </form>
      </div>
      <div className="w-[40%] pt-[50px] px-[30px]  flex flex-col gap-5 border-l-[1px]">
        <div className="flex gap-4 items-center">
          <input
            placeholder="Coupon Code"
            className="border-[1px] text-[16px] w-[245px] px-[8px] h-[36px] outline-none"
          />
          <button
            onClick={() => {
              // navigate('/checkout');
            }}
            className="px-[24px] text-[#fff] h-[36px] border-[1px] border-[#f04336] bg-[#e0564c]"
          >
            Apply
          </button>
        </div>
        <hr />
        <h5>Order Summary</h5>
        <div className="flex justify-between">
          <p>Sub Total </p>
          <p>{`$${SubTotal()}`}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p> Total </p>
          <p>{`$${SubTotal()}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
