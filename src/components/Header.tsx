"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartComponent from "./CartComponent";
import { useCartStore } from "@/store/cartStore";
type menuType = {
  name: string;
  url: string;
};
function Header() {
  const menu: menuType[] = [
    { name: "Inicio", url: "/" },
    { name: "Tienda", url: "/store" },
  ];
  const [isVisibleCart, setIsVisibleCart] = useState(false)
  const {cart} = useCartStore()
  const handleCartButtonClick = () => {
    setIsVisibleCart(true)
  }
  const handleCloseCart = () => {
    setIsVisibleCart(false)
  }

  useEffect(()=>{
    console.log(isVisibleCart)
  },[isVisibleCart])

  const pathname = usePathname();
  console.log(pathname);
  return (
    <header className="py-8 xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex justify-between items-center ">
      <div className="relative w-32 h-12">
        <Image
          src="/Header.svg"
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
          className="w-full h-full"
        />
      </div>

      <nav className="flex justify-center items-center ">
        <ul className="flex justify-center items-center gap-10 text-base">
          {menu.map((item, index) => (
            <li
              key={index}
              className={`${
                pathname === item.url ? "border-b-2 border-b-black" : ""
              } py-1 hover:border-b-2 hover:border-b-black transition-all`}
            >
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative size-8 cursor-pointer" onClick={handleCartButtonClick}>
        <Image
          src="/Cart.svg"
          alt="Icono de carrito"
          fill
          style={{ objectFit: "contain" }}
          className="w-full h-full"
        />
        {cart.length > 0 &&(
          <div className="bg-red-400 rounded-full text-sm text-white size-4 flex justify-center items-center absolute -top-1 -right-1">{cart.length}</div>
        )}
      </div>
      <CartComponent isVisible={isVisibleCart} onClose={handleCloseCart} />
    </header>
  );
}

export default Header;
