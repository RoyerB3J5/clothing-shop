'use client'
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
  const { cart } = useCartStore();
  const router = useRouter()
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
  }, [isVisible]);

  const subtotal = cart.reduce((total, item) => total + item.price,0)
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
        <div className="flex-grow overflow-y-auto  py-7 px-3 shadow-b ">
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
                  <p>Quantity: {item.quantity}</p>
                  <p>USD {item.price}</p>
                </div>
                <RiDeleteBin6Fill className="size-5 text-red-800 cursor-pointer" />
              </div>
            ))
          ) : (
            <p className="text-center">No hay productos en el carrito</p>
          )}
        </div>
        <div className="flex flex-col p-6 gap-7">
          <div className="flex justify-between items-center ">
            <p className="text-base font-medium">Subtotal: </p>
            <p>USD {subtotal.toFixed(2)}</p>
          </div>
          <button className="bg-black text-white rounded-md  w-full py-3 cursor-pointer" onClick={()=>router.push('/checkout')}>
            CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
}

export default CartComponent;
