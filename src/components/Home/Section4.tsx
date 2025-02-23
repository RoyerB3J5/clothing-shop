import Image from "next/image";
function Section4() {
  return (
    <section className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10 px-16 py-14">
      <div className="flex flex-col justify-center items-start gap-6">
        <h1 className="text-3xl font-medium">
          Explora nuestro paraiso de la moda!
        </h1>
        <p>
          Ingrese a un mundo de estilo y explore nuestra diversa colección de
          categorías de ropa.
        </p>
        <button className="bg-black text-white rounded-md px-4 py-2 flex justify-center items-center gap-3 text[14px]">
          Explorar{" "}
          <div className="relative size-3 ">
            <Image
              src="/arrow.svg"
              alt="Flecha"
              layout="fill"
              objectFit="contain"
              className="w-full h-full"
            />
          </div>
        </button>
      </div>
      <div className="relative w-full h-full flex justify-center items-center">
        <Image
          src="/category-image.png"
          alt="Persona"
          layout="fill"
          objectFit="contain"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

export default Section4;
