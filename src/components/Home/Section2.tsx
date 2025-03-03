import Image from "next/image";
type dataType = {
  title: string;
  description: string;
  image: string;
};

function Section2() {
  const data: dataType[] = [
    {
      title: "Free Shipping",
      description:
        "Upgrade your style today and get FREE shipping on all orders! Don't miss out.",
      image: "/delivery.svg",
    },
    {
      title: "Satisfaction Guarantee",
      description:
        "Shop confidently with our Satisfaction Guarantee: Love it or get a refund.",
      image: "/start.svg",
    },
    {
      title: "Secure Payment",
      description:
        "Your security is our priority. Your payments are secure with us.",
      image: "/shield.svg",
    },
  ];
  return (
    <section className="xl:max-w-(--max-width-xl) lg:max-w-(--max-width-lg) md:max-w-(--max-width-md) max-w-(--max-width-sm) mx-auto grid grid-cols-1 md:grid-cols-3 gap-14  py-20 justify-center items-center">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-start gap-9 h-full w-full"
        >
          <div className="p-3 bg-gray-100 rounded-full flex justify-center items-center">
            <div className="relative size-6 ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
              />
            </div>
          </div>
          <h3 className="text-base font-semibold">{item.title}</h3>
          <p className="text-[14px] text-[#5C5F6A] flex-1">
            {item.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default Section2;
