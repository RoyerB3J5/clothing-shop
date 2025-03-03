"use client";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { MdLocalShipping } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import CheckoutForm from "@/components/Form";
import ReviewComponent from "@/components/ReviewComponent";
interface IFormInput {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
}
const CheckoutPage = () => {
  const { cart } = useCartStore();
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal * 1.18;
  const router = useRouter();
  const [seeInfo, setSeeInfo] = useState(true);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false)
  const { info, setInfo } = useCheckoutStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setInfo(data);
    setSeeInfo(false)
    setShowError(false);
    setFormSubmitted(true)
  };
  const onError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 1000);
  };
  return (
    <>
      <div className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex justify-between items-center pt-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <MdLocalShipping
            className={`size-10 ${
              seeInfo ? "cursor-default" : "cursor-pointer"
            } text-white bg-black rounded-sm p-2 `}
            onClick={() => setSeeInfo(true)}
          />
          <p>Information</p>
        </div>
        <div
          className={`border-t-2 border-dotted ${
            seeInfo ? "border-gray-300" : "border-black"
          } flex-grow h-6  `}
        ></div>
        <div className="flex flex-col justify-center items-center gap-2 ml-3">
          <TiDocumentText
            className={`size-10 ${
              !seeInfo 
                ? "text-white bg-black "
                : "text-black bg-gray-200 "
            } ${formSubmitted?"cursor-pointer":"cursor-default"} rounded-sm p-2 r`} onClick={() => formSubmitted && setSeeInfo(false)}
          />
          <p>Review</p>
        </div>
      </div>
      <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex flex-col sm:flex-row jusitfy-center items-center gap-10 py-10 ">
        {seeInfo ? (
          <CheckoutForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} onError={onError} errors={errors} showError={showError}/>
        ) : (
          <ReviewComponent cart={cart} info={info} />
        )}

        <div className="sm:flex-1 border-1 border-gray-200 rounded-md flex flex-col justify-center items-start gap-10 p-8 py-10 w-full sm:max-w-[350px] self-start">
          <h4 className="text-xl font-semibold">Order Summary</h4>
          <div className="flex flex-col gap-5 w-full text-[15px]">
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Subtotal: </p>
              <p>USD {subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Shipping: </p>
              <p>Free</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500">Tax: </p>
              <p>USD {tax.toFixed(2)}</p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-500"></div>
          <div className="w-full flex justify-between items-center">
            <p>Total</p>
            <p>USD {total.toFixed(2)}</p>
          </div>
          {seeInfo ? (
            <button
              className="w-full underline underline-offset-4 cursor-pointer text-[14px] hover:-translate-y-1 transition-all"
              onClick={() => router.push("/cart")}
            >
              Back to cart
            </button>
          ) : (
            <button className="bg-black text-white rounded-md w-full py-3 cursor-pointer hover:bg-gray-200 hover:border-black hover:text-black transition-all" onClick={() => router.push("/finish")}>
              ASK FOR ORDER
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
