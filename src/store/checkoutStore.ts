import { create } from "zustand";
import { persist } from "zustand/middleware";
interface Info {
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
}

interface CheckoutStore{
  info: Info;
  setInfo: (info: Info) => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      info: {
        name: '',
        email: '',
        address: '',
        phone: '',
        city: ''
      },
      setInfo: (info)=>set({info})
    }),
    {name: 'checkout-store'}
  )
)