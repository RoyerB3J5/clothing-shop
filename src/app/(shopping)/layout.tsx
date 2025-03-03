"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
const ShoppingLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  let pageTitle = "";
  if (pathname.includes("/checkout")) {
    pageTitle = "Checkout";
  } else if (pathname.includes("/cart")) {
    pageTitle = "Cart";
  }
  return (
    <>
      <aside className=" min-h-[22vh] bg-gray-200 flex items-center justify-center">
        <nav className="xl:w-(--max-width-xl) lg:w-(--max-width-lg) md:w-(--max-width-md) w-(--max-width-sm)  flex flex-col items-start justify-center gap-2  ">
          <h2 className="text-2xl font-semibold">{pageTitle}</h2>
          <div className="flex jsutify-center items-center gap-2 text-lg">
            <Link href="/store" className="text-gray-500 hover:text-black transition-all"> Store</Link>
            <IoIosArrowForward />
            <p>{pageTitle}</p>
          </div>
        </nav>
      </aside>
      {children}
    </>
  );
};

export default ShoppingLayout;
