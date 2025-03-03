import Image from "next/image";
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  size: string;
}
interface Info {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
}

interface ReviewComponentProps {
  cart: CartItem[];
  info: Info
}
const ReviewComponent: React.FC<ReviewComponentProps> = ({
  cart,
  info
}) => {
  return (
    <div className="flex-grow">
      <div className="flex flex-col items-start justify-start sm:flex-2 self-start">
        {cart.map((item, index) => (
          <div
            className="flex justify-between items-center gap-2 sm:gap-7  sm:p-6 border-b-1 border-gray-200 w-full"
            key={index}
          >
            <div className="relative w-[50px] sm:w-[60px] h-[40px] sm:h-[90px] flex-shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                style={{ objectFit: "contain" }}
                className="w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex-grow flex justify-between items-center gap-2 px-3 sm:px-6">
              <div className="flex flex-col justify-center items-start gap-1">
                <p className="text-base font-medium">{item.name}</p>
                <p className="text-gray-400">Size: {item.size}</p>
              </div>
              <p>Quantity: {item.quantity}</p>
              <p>USD {item.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-start justify-center gap-4 w-full py-6">
          <p className="text-xl font-semibold">Information</p>
          <div className="flex flex-col items-start jutify-center gap-2">
            {info.name && <p className="text-base font-medium"> {info.name}</p>}
            {info.address && info.city && (
              <p className="text-base font-light">
                {info.address}, {info.city}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
