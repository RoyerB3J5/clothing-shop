"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
function Section4() {
  const router = useRouter()
  return (
    <section className="bg-gray-100 w-full">
      <div className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10  py-14">
        <div className="flex flex-col justify-center items-start gap-6">
          <h1 className="text-3xl font-medium">
            Browse Our Fashion Paradise!
          </h1>
          <p>
          Step into a world of style and explore our diverse collection of clothing categories.
          </p>
          <button className="bg-black text-white rounded-md px-4 py-2 flex justify-center items-center gap-3 text[14px]" onClick={()=> router.push("/store")}>
            Start Browsing{" "}
            <div className="relative size-3 ">
              <Image
                src="/arrow.svg"
                alt="Flecha"
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
              />
            </div>
          </button>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] flex justify-center items-center">
          <Image
            src="/category-image.png"
            alt="Persona"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

export default Section4;
