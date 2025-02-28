"use client";
import { useProductStore } from "@/store/productStore";
import { useState } from "react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const ProductClient = ({ code }: { code: string }) => {
  const [data, setData] = useState<any>({});
  const { product, setProduct } = useProductStore();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const url = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&country=us&productcode=1267888001`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "433c48d58emsh9741b43d8135e12p130e1bjsn479d0ee07082",
      "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const getData = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setProduct(result.product);
      setSelectedImage(
        result.product.articlesList[0].galleryDetails[0].baseUrl
      );
    } catch (error) {
      console.error(error);
    }
  };

  const seeData = () => {
    console.log(product);
  };
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto">
      <aside>
        <button
          onClick={getData}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Obtener Data
        </button>
        <nav className="flex items-center justify-start gap-2 text-[14px]">
          <a
            href="/store"
            className="text-gray-400 hover:text-black transition-all"
          >
            Store
          </a>
          <IoIosArrowForward />
          <p>{product.name}</p>
        </nav>
      </aside>
      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="relative w-auto h-[350px]">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex gap-2 justify-start items-center">
            {product.articlesList[0].galleryDetails
              .map((image: any, index: number) => (
                <div
                  key={index}
                  className="relative w-[60px] h-[60px] cursor-pointer"
                  onClick={() => setSelectedImage(image.baseUrl)}
                >
                  <Image
                    src={image.baseUrl}
                    alt={image.id}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="w-1/2">
          <h3>{product.name}</h3>
          <p>
            {product.whitePrice.currency} {product.whitePrice.price}{" "}
          </p>
          <p>{product.description}</p>
          <p>{product.color.text}</p>
          <div>
            <p className="uppercase">Select Sizes</p>
            <div className="flex flex-wrap gap-4 justify-start items-center">
              {product.articlesList[0].variantsList.map((item: any) => (
                <div
                  key={item.code}
                  className="flex items-center justify-center p-3 border-2 border-black  "
                >
                  <p>{item.size.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="uppercase bg-black text-white p-2 rounded">
            Add to Bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductClient;
