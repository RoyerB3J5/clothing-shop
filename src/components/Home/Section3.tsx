"use client"
import { useEffect, useState } from "react";
type categoriesType = {
  CatName: string;
  tagCodes: string[];
}
function Section3() {
  const [categories, setCategories]  = useState<categoriesType[]>([]);
  const url =
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "433c48d58emsh9741b43d8135e12p130e1bjsn479d0ee07082",
      "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const getCategories = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const data = JSON.parse(result);
      const filteredData = data.filter((item : any) => item.tagCodes.length > 0).map((item:any)=>({
        CatName: item.CatName,
        tagCodes: item.tagCodes
      }))
      setCategories(filteredData);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log(categories)
  },[categories])

  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto py-20 flex flex-col justify-center items-center gap-14 w-full">
      <h2 className="text-3xl font-medium  pb-2.5 border-b-2">Categorias</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center items-center gap-6 w-full">
        {categories && categories.map((item)=>(
          <button className="bg-gray-100 text-black rounded-xl px-8 py-8 font-medium  cursor-pointer hover:bg-black hover:text-white transition-all hover:-translate-y-1 " key={item.CatName}>
            {item.CatName}
          </button>
        ))}
      </div>
      <button className="bg-black text-white rounded-md px-4 py-2" onClick={getCategories}>
          Ver categorias
        </button>
    </section>
  );
}

export default Section3;
