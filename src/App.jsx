import { React, useState } from "react";
import "./index.css";

const App = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [pressCount, setPressCount] = useState(0);
  const maxPresses = 3;

  const calculateDiscount = () => {
    // Calculate the discount and tax rate to overall final price
    const price = parseFloat(originalPrice);
    console.log("price:", price);
    const discount = parseFloat(discountPercentage);
    const discountAmount = (price * discount) / 100;
    console.log("discount:", discountAmount);
    const finalDiscount = price - discountAmount;
    const tax = parseFloat(taxPercentage);
    const tempValue = finalDiscount + (finalDiscount * tax) / 100;

    if (!isNaN(tempValue)) {
      setFinalPrice(tempValue.toFixed(2));
    }

    if (pressCount < maxPresses) {
      setPressCount(pressCount + 1);
    }

    // Clear the input fields
    setOriginalPrice("");
    setDiscountPercentage("");
    setTaxPercentage("");
  };

  // Handler for input changes
  const priceChangeHandler = (event) => {
    setOriginalPrice(event.target.value);
  };

  // Handler for input changes
  const discountChangeHandler = (event) => {
    setDiscountPercentage(event.target.value);
  };

  // Handler for input changes
  const totalChangeHandler = (event) => {
    setTaxPercentage(event.target.value);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="shadow-2xl items-center bg-sky-200 border-2 border-solid border-pink-400 p-8 gap-4 rounded">
          <h1 className="font-serif text-4xl text-black p-3 m-b-5">
            Price Calculator
          </h1>

          <div className="space-y-4 font-mono text-lg font-semibold text-black py-5 row-auto">
            <div>
              <h2 className="block text-lg font-semibold text-black ml-4 mb-2">
                Original Price ($)
              </h2>
              <input
                className="min-w-60 text-sm mx-3.5 px-4 py-2 border border-black rounded-lg mb-2"
                type="number"
                placeholder="enter original price"
                value={originalPrice}
                onChange={priceChangeHandler}
              />
            </div>
            <div>
              <h2 className="block text-lg font-semibold text-black ml-4 mb-2">
                Sales Discount (%)
              </h2>
              <input
                className="min-w-60 text-sm mx-3.5 px-4 py-2 border border-black rounded-lg mb-2"
                type="number"
                placeholder="enter sales discount"
                value={discountPercentage}
                onChange={discountChangeHandler}
              />
            </div>
            <div>
              <h2 className="block text-lg font-semibold text-black ml-4 mb-2">
                Total Sales Tax (%)
              </h2>
              <input
                className="min-w-60 text-sm mx-3.5 px-4 py-2 border border-black rounded-lg mb-2"
                type="number"
                placeholder="enter total sales tax"
                onChange={totalChangeHandler}
                value={taxPercentage}
              />
            </div>
          </div>

          <div className="p-5 pb-7 mx-10">
            <button
              onClick={pressCount < maxPresses ? calculateDiscount : null}
              className="w-40 px-4 py-2 bg-yellow-300 font-serif text-black tracking-wide font-bold rounded-full border border-black hover:bg-yellow-200"
            >
              Calculate
            </button>
          </div>

          {finalPrice && (
            <div>
              <h3 className="font-mono text-lg font-semibold text-black px-5 py-2 row-auto">
                Final Sales Price
              </h3>
              <div className="text-sm mx-3.5 px-3 py-3 border border-black bg-white rounded-lg mb-2">
                <h3 className="font-mono text-md font-semibold text-black">
                  ${finalPrice}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
