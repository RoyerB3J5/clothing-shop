"use client"
import Image from "next/image";
import { usePathname } from "next/navigation";
type menuType = {
  name: string;
  url: string;
};
function Header() {
  const menu: menuType[] = [
    { name: "Inicio", url: "/" },
    { name: "Tienda", url: "/store" },
  ];
  const pathname = usePathname()
  console.log(pathname)
  return (
    <header className="py-8 px-16 w-full flex justify-between items-center ">
      <div className="relative w-32 h-12">
        <Image
          src="/Header.svg"
          alt="logo"
          layout="fill"
          objectFit="contain"
          className="w-full h-full"
        />
      </div>

      <nav className="flex justify-center items-center ">
        <ul className="flex justify-center items-center gap-10 text-base">
          {menu.map((item, index) => (
            <li key={index} className={`${pathname === item.url ?"border-b-2 border-b-black":""} py-1 hover:border-b-2 hover:border-b-black transition-all`}>
              <a href={item.url} >{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative size-8">
        <Image
          src="/Cart.svg"
          alt="Icono de carrito"
          layout="fill"
          objectFit="contain"
          className="w-full h-full"
        />
      </div>
    </header>
  );
}

export default Header;
