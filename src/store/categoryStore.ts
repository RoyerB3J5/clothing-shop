import {create} from "zustand"
import {persist} from "zustand/middleware"

interface CategoryStore {
  catStore: string;
  setCatStore: (categoryStore: string) => void
}
export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      catStore: "all",
      setCatStore: (catStore) => set({catStore})
    }),
    {name:'category-store'}
  )
)