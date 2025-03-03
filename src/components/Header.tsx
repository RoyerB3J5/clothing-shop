"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartComponent from "./CartComponent";
import { useCartStore } from "@/store/cartStore";
import { IoIosMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
type menuType = {
  name: string;
  url: string;
};
function Header() {
  const menu: menuType[] = [
    { name: "Home", url: "/" },
    { name: "Store", url: "/store" },
  ];
  const [isVisibleCart, setIsVisibleCart] = useState(false);
  const { cart } = useCartStore();
  const [seeMenu, setSeeMenu] = useState(false);
  const router = useRouter();
  const handleCartButtonClick = () => {
    setIsVisibleCart(true);
  };
  const handleCloseCart = () => {
    setIsVisibleCart(false);
  };
  const pathname = usePathname();

  useEffect(()=>{
    if(seeMenu){
      document.body.style.overflow = "hidden"
    }else {
      document.body.style.overflow = "auto"
    }
  },[seeMenu])
  return (
    <header className="py-8 xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex justify-between items-center ">
      <div
        className="relative w-32 h-12 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/Header.svg"
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
          className="w-full h-full"
        />
      </div>

      <nav className={` ${seeMenu?"absolute bg-white py-14 top-[145px] w-full right-0 animate-slide-down z-20" : "hidden sm:flex"} justify-center items-center `}>
        <ul className="flex  w-full flex-col sm:flex-row justify-center items-center gap-14 sm:gap-12 text-base">
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

      <div
        className="relative size-8 cursor-pointer"
        onClick={handleCartButtonClick}
      >
        <Image
          src="/Cart.svg"
          alt="Icono de carrito"
          fill
          style={{ objectFit: "contain" }}
          className="w-full h-full"
        />
        {cart.length > 0 && (
          <div className="bg-red-400 rounded-full text-sm text-white size-4 flex justify-center items-center absolute -top-1 -right-1">
            {cart.length}
          </div>
        )}
      </div>
      <CartComponent isVisible={isVisibleCart} onClose={handleCloseCart} />
      <IoIosMenu className="sm:hidden text-gray-600 size-7 stroke-1" onClick={()=>setSeeMenu(!seeMenu)}/>
    </header>
  );
}

export default Header;
