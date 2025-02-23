import Image from "next/image";
function Section1() {
  return (
    <section className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-10 px-16">
      <div className="flex flex-col justify-center items-start gap-6">
        <h1 className="text-3xl font-medium">Lo mas nuevo</h1>
        <p>Descubre hoy nuestra nueva coleccion</p>
        <button className="bg-black text-white rounded-md px-4 py-2">
          Ver Mas!
        </button>
      </div>
      <div className="relative py-10">
        <div className="relative w-auto h-[300px]">
          <Image
            src="/Ellipse.svg"
            alt="Fondo de imagen"
            layout="fill"
            objectFit="contain"
            className="w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-10 pt-5 flex justify-center items-center">
          <div className="relative w-full h-full">
            <Image
              src="/hero-image.png"
              alt="Persona"
              layout="fill"
              objectFit="contain"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section1;
