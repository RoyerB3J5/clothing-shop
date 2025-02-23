import Image from "next/image";
type dataType = {
  title: string;
  description: string;
  image: string;
};

function Section2() {
  const data: dataType[] = [
    {
      title: "Envío gratis",
      description:
        "Renueva tu estilo hoy y obten envío gratis en todas tus compras",
      image: "/delivery.svg",
    },
    {
      title: "Satisfacción garantizada",
      description:
        "Compre con confianza con nuestra Garantía de satisfacción: le encantará o le reembolsaremos el dinero.",
      image: "/start.svg",
    },
    {
      title: "Pagos seguros",
      description:
        "Tu seguridad es nuestra prioridad. Tus pagos son seguros y tus datos están protegidos.",
      image: "/shield.svg",
    },
  ];
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-16 py-20 justify-center items-center">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-start gap-7 h-full"
        >
          <div className="p-3 bg-gray-100 rounded-full flex justify-center items-center">
            <div className="relative size-6 ">
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="contain"
                className="w-full h-full"
              />
            </div>
          </div>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="text-[14px] text-[#5C5F6A] flex-1">{item.description}</p>
        </div>
      ))}
    </section>
  );
}

export default Section2;
