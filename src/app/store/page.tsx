"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { Spinner } from "@/components/ui/spinner";
import { PaginationController } from "@/components/Store/PaginationControler";
import ListProduct from "@/components/ListProduct";

type categoriesType = {
  catName: string;
  catTag: string;
};
type paginationType = {
  currentPage: number;
  numberOfPages: number;
  totalResults: number;
};
function Page() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<paginationType>({
    currentPage: 1,
    numberOfPages: 0,
    totalResults: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { catStore, setCatStore } = useCategoryStore();
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

  const buildUrl = () => {
    const baseUrl =
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=${pagination.currentPage-1}&pagesize=30`;

    return catStore === "all" ? baseUrl : `${baseUrl}&categories=${catStore}`;
  };

  const url = buildUrl();

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "433c48d58emsh9741b43d8135e12p130e1bjsn479d0ee07082",
      "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const handleCategory = (value: string) => {
    setCatStore(value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result.results);
        setPagination((prev: paginationType) => ({
          ...prev,
          numberOfPages: result.pagination.numberOfPages,
          totalResults: result.pagination.totalNumberOfResults,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData()
  }, [catStore, pagination.currentPage]);

  const handlePageChange = (page: number) => {
    setPagination((prev: paginationType) => ({
      ...prev,
      currentPage: page,
    }));


  }
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto flex flex-col sm:flex-row gap-10">
      <aside className="flex flex-col items-start justify-start text-black w-full sm:w-1/5 border-1 border-gray-200 gap-5 p-6 py-8 rounded-lg self-start">
        <h3 className="text-lg font-medium">Categories</h3>
        <RadioGroup
          className="flex flex-wrap flex-row sm:flex-col justify-start items-start gap-6 pl-4"
          value={catStore}
          onValueChange={handleCategory}
        >
          {categories.map((category) => (
            <div key={category.catTag} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category.catTag}
                id={category.catTag}
                className="cursor-pointer"
              />
              <Label htmlFor={category.catTag} className="text-gray-700">{category.catName}</Label>
            </div>
          ))}
        </RadioGroup>
      </aside>
      <div className="w-full sm:w-4/5 flex flex-col gap-8 ">
        {isLoading ? (
          <Spinner size="md" className="bg-black self-center" />
        ) : (
          <>
            <h3>
              Showing {pagination.currentPage} - {pagination.numberOfPages} of{" "}
              {pagination.totalResults} results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full justify-center items-center">
              {data.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.map((item: any) => (
                  <ListProduct key={item.code} code={item.code} codeArticle={item.articles[0].code} imageUrl={item.images[0].url} nameClothe={item.name} price={item.price.formattedValue}/>
                ))
              ) : (
                <p>No hay prendas</p>
              )}
            </div>
            <PaginationController
              totalPages={pagination.numberOfPages}
              currentPage={pagination.currentPage}
              onPageChange={handlePageChange}
              siblingCount={1}
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
