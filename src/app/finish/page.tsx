'use client'
import { useCheckoutStore } from "@/store/checkoutStore";
import Link from "next/link";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
function Page() {
  const { info } = useCheckoutStore();
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex flex-col justify-center items-center gap-10 py-10">
      <FaCheckCircle className="text-green-400 size-14" />
      <p className="max-w-[700px] text-center">
        Gracias por tu compra, {info.name}. Estamos alistando tu pedido para que
        sea entregado lo más pronto posible. Te invitamos a revisar tu correo
        para que tengas más información de tu compra
      </p>
      <Link
        href="/"
        className="underline underline-offset-4 cursor-pointer text-[14px] hover:-translate-y-1 transition-all"
      >
        See more
      </Link>
    </section>
  );
}

export default Page;
