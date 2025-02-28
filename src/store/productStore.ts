import {create} from "zustand"
import {persist} from "zustand/middleware"

interface ProductStore {
  product: any
  setProduct: (product: any) => void
}
export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      product: {},
      setProduct: (product) => set({product})
    }),
    {name:'product-store'}
  )
)