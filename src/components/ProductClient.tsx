"use client";
import { useProductStore } from "@/store/productStore";
import { useState } from "react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ListProduct from "./ListProduct";
import { useCartStore } from "@/store/cartStore";

const ProductClient = ({ code }: { code: string }) => {
  const [data, setData] = useState<any>({});
  const { product, setProduct } = useProductStore();
  const {addProduct} = useCartStore()
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [countClothe, setCountClothe] = useState<number>(1);
  const [similarItems, setSimilarItems] = useState<any>([]);
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

      if (!product.mainCategory.code) return;
      const urlCollection = `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=${product.mainCategory.code}`;
      const responseCollection = await fetch(urlCollection, options);
      const resultCollection = await responseCollection.json();
      setSimilarItems(resultCollection.results);
    } catch (error) {
      console.error(error);
    }
  };

  const seeData = () => {
    console.log(product);
  };

  const handleSize = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (val > 0) {
      setCountClothe(val);
    }
  };
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex flex-col justify-center items-start gap-8">
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
      <div className="flex gap-8 flex-col sm:flex-row w-full">
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-7 sm:sticky sm:top-10 self-start">
          <div className="relative w-full h-[380px]">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex gap-4 justify-start items-center">
            {product.articlesList[0].galleryDetails.map(
              (image: any, index: number) => (
                <div
                  key={index}
                  className="relative w-[80px] h-[80px] cursor-pointer"
                  onClick={() => setSelectedImage(image.baseUrl)}
                >
                  <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 transition-opacity z-10" />
                  <Image
                    src={image.baseUrl}
                    alt={image.id}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center items-start gap-5">
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <p className="text-gray-500 font-semibold">
            {product.whitePrice.currency} {product.whitePrice.price}{" "}
          </p>

          <p className="text-[14px] text-gray-400">
            Color: {product.color.text}
          </p>
          <div className="flex flex-col justify-center items-start gap-2">
            <p className="uppercase">Select Sizes</p>
            <div className="flex flex-wrap gap-4 justify-start items-center">
              {product.articlesList[0].variantsList.map((item: any) => (
                <div
                  key={item.code}
                  className={`flex items-center justify-center p-3 border-2 border-black size-12 cursor-pointer transition-all hover:bg-black hover:text-white ${
                    selectedSize === item.size.name ? "bg-black text-white" : ""
                  }`}
                  onClick={() => handleSize(item.size.name)}
                >
                  <p>{item.size.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justifiy-start items-center gap-4 w-full mt-3">
            <input
              type="number"
              className="w-1/3 h-full py-3 px-3 border border-gray-300 rounded"
              value={countClothe}
              onChange={handleCountChange}
            />
            <button className="uppercase bg-black text-white px-4 rounded w-2/3 h-full py-3 cursor-pointer hover:-translate-y-1 transition-all" onClick={() => addProduct({
              name: product.name,
              price: product.whitePrice,
              quantity: countClothe,
              imageUrl: product.articlesList[0].galleryDetails[0].baseUrl,
              size: selectedSize
            })}>
              Add to Bag
            </button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="Description">
              <AccordionTrigger>Description & Fit</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5 text-[14px]">
                <p className=" text-justify">{product.description}</p>
                <div>
                  <p className="uppercase font-semibold">Size</p>
                  <ul className="flex flex-col gap-2">
                    {product.measurements.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="uppercase font-semibold">Fit</p>
                  <p>{product.fits[0]}</p>
                </div>
                <div>
                  <p className="uppercase font-semibold">Collection</p>
                  <p>{product.collection}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Materials">
              <AccordionTrigger>Materials</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-7 text-[14px]">
                {product.articlesList[0].materialDetails.map(
                  (item: any, index: number) => (
                    <div key={index} className="flex flex-col gap-2">
                      <p className="uppercase font-semibold">{item.name}</p>
                      <p>{item.description}</p>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Care Guide">
              <AccordionTrigger>Care Guide</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-5 text-[14px]">
                <p className="uppercase font-semibold">Care instructions</p>
                <ul className="list-disc pl-5">
                  {product.articlesList[0].careInstructions.map(
                    (item: any, index: number) => (
                      <li key={index} className="">
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {product.collection ? (
        <div className="flex flex-col gap-3 w-full mt-10">
          <h4 className="uppercase text-2xl">Similar Items</h4>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <div className="w-full flex justify-end items-center gap-5 mb-2 ">
              <CarouselPrevious className="h-8 w-8 " />
              <CarouselNext className="h-8 w-8 " />
            </div>
            <CarouselContent className="py-4 h-full">
              {similarItems.map((item:any, index: number) => (
                <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 h-[400px] w-full flex justify-center">
                  <ListProduct code ={item.code} codeArticle={item.articles[0].code} imageUrl={item.images[0].url}
                  nameClothe={item.name}
                  price={item.price.formattedValue}/>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : null}
    </section>
  );
};

export default ProductClient;
