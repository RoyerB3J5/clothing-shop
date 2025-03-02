"use client"
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface ListProductProps {
  code:string;
  codeArticle:string ;
  imageUrl: string;
  nameClothe:string;
  price:string;
}
const ListProduct:React.FC<ListProductProps> = ({
  code,
  codeArticle,
  imageUrl,
  nameClothe,
  price,
})=> {
  const router = useRouter()
  return (
    <div
      className="flex flex-col justify-center items-center gap-2 p-5 border-1 border-gray-200 rounded-lg cursor-pointer hover:border-black hover:-translate-y-2 transition-all w-[75%] sm:w-full h-full"
      key={code}
      onClick={() => router.push(`/store/${codeArticle}`)}
    >
      <div className="relative w-full h-[220px] md:h-[280px] flex justify-start items-start">
        <Image
          src={imageUrl}
          alt={nameClothe}
          fill
          style={{ objectFit: "contain" }}
          className="w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="text-center">{nameClothe}</p>
      <p className="text-gray-400">{price}</p>
    </div>
  );
}

export default ListProduct;
