"use client";
import { useCartStore } from "@/store/cartStore";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface CartComponentProps {
  isVisible: boolean;
  onClose: () => void;
}
function CartComponent({ isVisible, onClose }: CartComponentProps) {
  const { cart, updateProductQuantity, removeProduct } = useCartStore();
  const router = useRouter();
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isVisible]);
  const pushCheckout = () => {
    
    router.push("/checkout");
    onClose()
  }
  const pushCart = () => {
    
    router.push("/cart");
    onClose()
  }
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  return (
    <>
      {isVisible && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-40"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 right-0 w-[400px] bg-white h-full shadow-lg transform transition-transform duration-300 z-50  flex flex-col ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex-grow overflow-y-auto py-7 px-3  ">
          <div className="p-4 flex justify-end items-center">
            <IoClose onClick={onClose} className="cursor-pointer" />
          </div>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                className="flex justify-between items-center gap-7 p-6 border-b-1 border-gray-200"
                key={index}
              >
                <div className="relative w-[60px] h-[70px] flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-center items-start gap-2">
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
                <RiDeleteBin6Fill className="size-5 text-red-800 cursor-pointer" onClick={()=>removeProduct(item.name, item.size)}/>
              </div>
            ))
          ) : (
            <p className="text-center">You have no products in your cart</p>
          )}
        </div>
        <div className="flex flex-col p-6 gap-7 bg-gray-100">
          <div className="flex justify-between items-center text-gray-600 ">
            <p className="text-base ">Subtotal: </p>
            <p>USD {subtotal.toFixed(2)}</p>
          </div>
          <button
            className="bg-black text-white rounded-md  w-full py-3 cursor-pointer"
            onClick={() => pushCart()}
          >
            CART
          </button>
          <button
            className="bg-black text-white rounded-md  w-full py-3 cursor-pointer"
            onClick={() => pushCheckout()}
          >
            CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
}

export default CartComponent;
