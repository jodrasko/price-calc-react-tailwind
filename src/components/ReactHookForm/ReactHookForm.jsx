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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md min-h-screen pt-24 bg-sky-200 border-2 border-solid border-pink-400 shadow-2xl rounded-2xl overflow-hidden">
        <h1 className="font-serif font-bold text-center text-2xl p-4">
          Price Calculator
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="p-4 space-y-4"
        >
          <div className="space-y-4 ">
            {/* Original Price Input */}
            <div>
              <label
                htmlFor="price"
                className="block font-mono text-base font-semibold text-black ml-1 mb-2"
              >
                Original Price ($)
              </label>

              <input
                className={`w-full border rounded-lg transition-all 
                  ${
                    errors.price
                      ? "text-base px-3 py-1 border-2 border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                      : "text-base px-3 py-1 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800 rounded-lg mb-2"
                  }`}
                id="price"
                type="text"
                placeholder="Enter original price"
                {...register("price", {
                  required: "required",
                  pattern: {
                    value: /^[$€£]?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/,
                    message: "Invalid price format (e.g., $100 or 100.50)"
                  }
                })}
              />
              {errors.price && (
                <span className="md:max-2xl:block mb-2 ml-2 text-red-500 text-sm md:text-base lg:max-xl:text-base">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Discount Input */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="discount"
                  className="block font-mono text-base font-semibold text-black ml-1 mb-2"
                >
                  Sales Discount (%)
                </label>
                <input
                  className={`
                  w-full border rounded-lg transition-all
                  ${
                    errors.discount
                      ? "text-base px-3 py-1 border-2 border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                      : "text-base px-3 py-1 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800  rounded-lg mb-2"
                  }`}
                  id="discount"
                  type="text"
                  placeholder="Enter sales discount"
                  {...register("discount", {
                    required: "required",
                    pattern: {
                      value: /^(\d{1,2})$/,
                      message: "Invalid sales discount value entered."
                    }
                  })}
                />
                {errors.discount && (
                  <span className="md:max-2xl:block mb-2 ml-2 text-red-500 text-sm md:text-base lg:max-xl:text-base">
                    {errors.discount.message}
                  </span>
                )}
              </div>
            </div>

            {/* Tax Input */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="tax"
                  className="block font-mono text-base font-semibold text-black ml-1 mb-2"
                >
                  Total Sales Tax (%)
                </label>
                <input
                  className={`
                  w-full border rounded-lg transition-all 
                  ${
                    errors.tax
                      ? "text-base px-3 py-1 border-2  border-red-500 focus:outline-none focus:border-red-700 rounded-lg mb-2"
                      : "text-base px-3 py-1 border border-blue-500  focus:outline-none focus:border-blue-800 focus:ring-1 focus:ring-blue-800  rounded-lg mb-2"
                  }`}
                  id="tax"
                  type="text"
                  placeholder="Enter total sales tax"
                  {...register("tax", {
                    required: "required",
                    pattern: {
                      value: /^[$€£]?(\d{1,3}(,\d{3})*|\d+)(\.\d{2})?$/,
                      message: "Invalid tax value entered."
                    }
                  })}
                />
                {errors.tax && (
                  <span className="md:max-2xl:block mb-2 ml-2 text-red-500 text-sm md:text-base lg:max-xl:text-base">
                    {errors.tax.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex items-center justify-center p-3">
            <button
              type="submit"
              className="w-50 md:max-2xl:w-3/4 mt-1 px-5 py-2 bg-yellow-300 text-base font-serif text-black font-semibold rounded-full border border-black hover:bg-yellow-200"
            >
              Calculate
            </button>
          </div>

          {/* Result Display */}
          {finalPrice && (
            <div className="space-y-2 pb-3">
              <label className="block font-mono text-base font-semibold text-black ml-1">
                Final Sales Price
              </label>
              <div className="px-3 py-1 border border-blue-700 bg-white rounded-lg">
                <h3 className="text-base text-black">${finalPrice}</h3>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReactHookForm;
