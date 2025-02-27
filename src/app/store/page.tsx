"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import Image from "next/image";

type categoriesType = {
  catName: string;
  catTag: string;
};

function Page() {
  const [data, setData] = useState([]);
  const categories: categoriesType[] = [
    {
      catName: "All",
      catTag: "all",
    },
    {
      catName: "Women",
      catTag: "ladies_all",
    },
    {
      catName: "Divided",
      catTag: "ladies_divided",
    },
    {
      catName: "Men",
      catTag: "men_all",
    },
    {
      catName: "Kids",
      catTag: "kids_all",
    },
    {
      catName: "Home",
      catTag: "home_all",
    },
    {
      catName: "Beauty",
      catTag: "beauty_all",
    },
    {
      catName: "Sport",
      catTag: "sportswear",
    },
    {
      catName: "Baby",
      catTag: "kids_newbornbaby_viewall",
    },
  ];

  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30";
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
      setData(result.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex gap-10">
      <aside className="flex flex-col items-start justify-start text-black w-1/5 border-1 border-grey-100 gap-7 p-6 rounded-lg self-start">
        <button
          className="bg-black text-white p-2 rounded-md"
          onClick={getData}
        >
          Obtener datos
        </button>
        <h3 className="text-lg font-medium">Categories</h3>
        <RadioGroup
          defaultValue="all"
          className="flex flex-col justify-start items-start gap-6 pl-4"
        >
          {categories.map((category) => (
            <div key={category.catTag} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category.catTag}
                id={category.catTag}
                className="cursor-pointer"
              />
              <Label htmlFor={category.catTag}>{category.catName}</Label>
            </div>
          ))}
        </RadioGroup>
      </aside>
      <div className="w-4/5 grid grid-cols-3 gap-10">
        {data.length > 0 ? (
          data.map((item: any) => (
            <div
              className="flex flex-col justify-center items-center gap-2 p-5 border-1 border-grey-100 rounded-lg"
              key={item.code}
            >
              <div className="relative w-full h-[300px] flex justify-start items-start">
                <Image
                  src={item.images[0].url}
                  alt={item.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="w-full h-full"
                />
              </div>
              <p>{item.name}</p>
              <p className="text-grey-100">{item.price.formattedValue}</p>
            </div>
          ))
        ) : (
          <p>No hay prendas</p>
        )}
      </div>
    </section>
  );
}

export default Page;
