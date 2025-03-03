"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
function Section1() {
  const router = useRouter()
  return (
    <section className="bg-gray-100 w-full">
      <div className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10  mx-auto pt-8 sm:py-0">
        <div className="flex flex-col justify-center items-start gap-6">
          <h1 className="text-3xl font-medium">Fresh Arrivals Online</h1>
          <p>Discover Our Newest Collection Today</p>
          <button className="bg-black text-white rounded-md px-4 py-2" onClick={()=> router.push("/store")}>
            View Collection!
          </button>
        </div>
        <div className="relative py-10">
          <div className="relative w-auto h-[300px]">
            <Image
              src="/Ellipse.svg"
              alt="Fondo de imagen"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full z-10 pt-5 flex justify-center items-center">
            <div className="relative w-full h-full">
              <Image
                src="/hero-image.png"
                alt="Persona"
                fill
                priority
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
