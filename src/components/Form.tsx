import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
}
interface CheckoutFormProps {
  register: UseFormRegister<IFormInput>;
  handleSubmit: UseFormHandleSubmit<IFormInput>;
  onSubmit: SubmitHandler<IFormInput>;
  onError: (errors:FieldErrors<IFormInput>)=>void;
  errors: FieldErrors<IFormInput>;
  showError: boolean;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({
  register,
  handleSubmit,
  onSubmit,
  onError,
  errors,
  showError
}) => {
  return (
    <form
      className="flex flex-col items-start justify-start sm:flex-2 self-start gap-8 w-full"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h2 className="text-2xl font-medium">Personal Information</h2>
      {showError && Object.keys(errors).length > 0 && (
        <div className="w-full p-4 mb-4 text-white bg-red-500 rounded-md">
          Please fill out all fields.
        </div>
      )}
      <div className="w-full">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="w-full px-5 py-2 border border-gray-200 rounded-md focus:outline focus:border-black"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="w-full">
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="w-full px-5 py-2 border border-gray-200 rounded-md focus:outline focus:border-black"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="w-full">
        <input
          {...register("address", { required: "Address is required" })}
          placeholder="Address"
          className="w-full px-5 py-2 border border-gray-200 rounded-md focus:outline focus:border-black"
        />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="w-full">
        <input
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone"
          className="w-full px-5 py-2 border border-gray-200 rounded-md focus:outline focus:border-black"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      <div className="w-full">
        <input
          {...register("city", { required: "City is required" })}
          placeholder="City"
          className="w-full px-5 py-2 border border-gray-200 rounded-md focus:outline focus:border-black"
        />
        {errors.city && <p className="text-red-500">{errors.city.message}</p>}
      </div>
      <button
        className="bg-black text-white rounded-md w-full py-3 cursor-pointer hover:bg-gray-200 hover:border-black hover:text-black transition-all"
        type="submit"
      >
        PLACE ORDER
      </button>
    </form>
  );
};

export default CheckoutForm;