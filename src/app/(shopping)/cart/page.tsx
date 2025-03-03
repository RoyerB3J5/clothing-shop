"use client";
import { useCartStore } from "@/store/cartStore";
import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CartPage = () => {
  const { cart, updateProductQuantity, removeProduct } = useCartStore();
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal*1.18;
  const router = useRouter()
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex flex-col sm:flex-row jusitfy-center items-center gap-10 py-10">
      <div className="flex flex-col items-start justify-start sm:flex-2 self-start">
        {cart.map((item, index) => (
          <div
            className="flex justify-between items-center gap-2 sm:gap-7  sm:p-6 border-b-1 border-gray-200 w-full"
            key={index}
          >
            <div className="relative w-[50px] sm:w-[60px] h-[40px] sm:h-[90px] flex-shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-grow flex justify-between items-center gap-2 px-3 sm:px-6">
              <div className="flex flex-col justify-center items-start gap-1">
                <p className="text-base font-medium">{item.name}</p>
                <p className="text-gray-400">Size: {item.size}</p>
              </div>
              <p>
                Quantity:{" "}
                <select
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    updateProductQuantity(
                      item.name,
                      item.size,
                      parseInt(e.target.value)
                    )
                  }
                  className="px-2 py-1 border-2 border-gray-200 rounded-sm ml-2"
                >
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </p>
              <p>USD {item.price * item.quantity}</p>
            </div>
            <RiDeleteBin6Fill
              className="size-5 text-red-800 cursor-pointer"
              onClick={() => removeProduct(item.name, item.size)}
            />
          </div>
        ))}
      </div>
      <div className="sm:flex-1 border-1 border-gray-200 rounded-md flex flex-col justify-center items-start gap-10 p-8 py-10 w-full sm:max-w-[350px] ">
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
            <p>USD {(tax).toFixed(2)}</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500"></div>
        <div className="w-full flex justify-between items-center">
          <p>Total</p>
          <p>USD {total.toFixed(2)}</p>
        </div>
        <button className="bg-black text-white rounded-md  w-full py-3 cursor-pointer" onClick={()=>router.push('/checkout')}>
          CHECKOUT
        </button>
      </div>
    </section>
  );
};

export default CartPage;