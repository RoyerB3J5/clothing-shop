import Image from "next/image";
type dataFooterType = {
  title: string;
  items: string[];
};
type IconsType = {
  src: string;
  alt: string;
};

function Footer() {
  const dataFooter: dataFooterType[] = [
    {
      title: "Soporte",
      items: ["FAQ", "Términos y condiciones", "Política de privacidad"],
    },
    {
      title: "Compañía ",
      items: ["Nosotro", "Contacto", "Carrera"],
    },
    {
      title: "Tienda",
      items: ["Mi cuenta", "Carrito", "Checkout"],
    },
  ];

  const socialIcons: IconsType[] = [
    {
      src: "/github.svg",
      alt: "GIthub",
    },
    {
      src: "/instagram.svg",
      alt: "Instagram",
    },
    {
      src: "/youtube.svg",
      alt: "Youtube",
    },
  ];

  const paymentMethods: IconsType[] = [
    {
      src: "/mastercard.svg",
      alt: "mastercard",
    },
    {
      src: "/visa.svg",
      alt: "visa",
    },
    {
      src: "/amex.svg",
      alt: "Amex",
    },
  ];
  return (
    <footer className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) flex flex-col sm:flex-row justify-between items-start mx-auto py-16 gap-10 ">
      <div className="flex flex-col justify-center items-center sm:items-start gap-8 w-full sm:flex-1 h-full">
        <div className="flex justify-start items-center gap-3">
          <div className="relative size-7  ">
            <Image
              src="/logo-footer.svg"
              alt="Flecha"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
            />
          </div>
          <h3 className="font-semibold">Ecommerce</h3>
        </div>
        <div>
          <p className="text-[14px] font-light">
            Desarrollamos tu pagina web de acuerdo a tus necesidades
          </p>
        </div>
        <div className="flex justify-start items-center gap-5">
          {socialIcons.map((item) => (
            <div className="relative size-5 " key={item.alt}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-start gap-7 w-full sm:flex-2">
        {dataFooter.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-start items-start gap-6 h-full flex-1 text-[14px]"
          >
            <h4 className="uppercase text-gray-400">{item.title}</h4>
            <ul className="flex flex-col justify-center items-start gap-4  font-light">
              {item.items.map((i, index) => (
                <li key={index}>
                  <a href="">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-start items-center sm:items-start gap-7 w-full sm:basis-2 h-full ">
        <h3 className="uppercase text-gray-400 text-[14px]">Metodos de Pago</h3>
        <div className="flex justify-start items-center gap-5">
          {paymentMethods.map((item) => (
            <div key={item.alt} className="relative size-8 ">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
