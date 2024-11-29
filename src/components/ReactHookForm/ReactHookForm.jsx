import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const [finalPrice, setFinalPrice] = useState("");
  const [pressCount, setPressCount] = useState(0);
  const maxPresses = 3;

  const calculateDiscount = (data) => {
    // Calculate the discount and tax rate to overall final price
    const price = parseFloat(data.price);
    const discount = parseFloat(data.discount);
    const discountAmount = (price * discount) / 100;
    const finalDiscount = price - discountAmount;
    const tax = parseFloat(data.tax);
    const tempValue = finalDiscount + (finalDiscount * tax) / 100;

    if (!isNaN(tempValue)) {
      setFinalPrice(tempValue.toFixed(2));
    }

    if (pressCount < maxPresses) {
      setPressCount(pressCount + 1);
    }
  };

  const onSubmit = (data) => {
    {
      pressCount < maxPresses ? calculateDiscount(data) : null;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="shadow-2xl items-center bg-sky-200 border-2 border-solid border-pink-400 p-8 md:p-10 lg:p-12 xl:p-12 gap-4 rounded">
        <h1 className="font-serif text-4xl text-black p-3 m-b-5">
          Price Calculator
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className=" space-y-4 font-mono text-lg font-semibold text-black py-7 row-auto">
            <div>
              <h2 className="block text-lg md:text-xl font-semibold text-black ml-4 mb-2">
                Original Price ($)
              </h2>
              <input
                className={
                  errors.price
                    ? "min-w-60 text-sm md:max-xl:text-base mx-3.5 px-4 py-2 md:pr-20 border-2 border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                    : "min-w-60 text-sm md:max-xl:text-base mx-3.5 px-4 py-2 md:pr-20 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 rounded-lg mb-2"
                }
                id="price"
                type="text"
                placeholder="enter original price"
                {...register("price", {
                  required: "required",
                  pattern: {
                    value: /^[$€£]?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/,
                    message: "Invalid price value entered."
                  }
                })}
              />
              {errors.price && (
                <span className="lg:max-xl:block mb-2 ml-4 mt-2 text-red-500 text-sm md:text-base lg:max-xl:text-base">
                  {errors.price.message}
                </span>
              )}
            </div>
            <div>
              <h2 className="block text-lg md:text-xl font-semibold text-black ml-4 mb-2">
                Sales Discount (%)
              </h2>
              <input
                className={
                  errors.discount
                    ? "min-w-60 text-sm mx-3.5 md:max-xl:text-base px-4 py-2 md:pr-20 border-2 border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                    : "min-w-60 text-sm mx-3.5 md:max-xl:text-base px-4 py-2 md:pr-20 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800  rounded-lg mb-2"
                }
                id="discount"
                type="text"
                placeholder="enter sales discount"
                {...register("discount", {
                  required: "required",
                  pattern: {
                    value: /^(\d{1,2})$/,
                    message: "Invalid sales discount value entered."
                  }
                })}
              />
              {errors.discount && (
                <span className=" lg:max-xl:block mb-2 ml-4 mt-2 text-red-500 text-sm md:text-base lg:max-xl:text-base">
                  {errors.discount.message}
                </span>
              )}
            </div>
            <div>
              <h2 className="block text-lg md:text-xl font-semibold text-black ml-4 mb-2">
                Total Sales Tax (%)
              </h2>
              <input
                className={
                  errors.tax
                    ? "min-w-60 text-sm mx-3.5 md:max-xl:text-base px-4 py-2 md:pr-20 border-2  border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                    : "min-w-60 text-sm md:max-xl:text-base mx-3.5 px-4 py-2 md:pr-20 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800  rounded-lg mb-2"
                }
                id="tax"
                type="text"
                placeholder="enter total sales tax"
                {...register("tax", {
                  required: "required",
                  pattern: {
                    value: /^[$€£]?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/,
                    message: "Invalid tax value entered."
                  }
                })}
              />
              {errors.tax && (
                <span className="lg:max-xl:block mb-2 ml-4 mt-2 text-red-500  text-sm md:text-base lg:max-xl:text-base">
                  {errors.tax.message}
                </span>
              )}
            </div>
          </div>

          <div className="p-5 pt-2 pb-7 mx-10">
            <button
              type="submit"
              className="w-40 px-4 py-2 md:px-6 md:py-3 md:ml-3 bg-yellow-300 font-serif text-black tracking-wide font-bold rounded-full border border-black hover:bg-yellow-200"
            >
              Calculate
            </button>
          </div>

          {finalPrice && (
            <div>
              <h3 className="font-mono text-lg lg:text-xl xl:text-lg  font-semibold text-black px-5 py-2 row-auto">
                Final Sales Price
              </h3>
              <div className="text-sm min-w-60 mx-5 px-4 py-2 md:pr-20 border border-blue-700 bg-white rounded-lg mb-2">
                <h3 className="font-mono text-md font-semibold text-black">
                  ${finalPrice}
                </h3>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;
