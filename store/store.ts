import create from "zustand";
import { persist, devtools } from "zustand/middleware";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

type State = {
  total: number;
  totalqty: number;
  cartContent: Product[];
};

const useCart = create(
  persist(
    (set, get) => ({
      total: 0,
      totalqty: 0,
      cartContent: [],
      addTocart: (params: Product) => {
        set((state: State) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseInt(params.price),
          cartContent: [...state.cartContent, params],
        }));
      },
      updatecart: ({ params, mycart }) => {
        set((state: State) => ({
          totalqty: state.totalqty + 1,
          total: state.total + parseInt(params.price),
          cartContent: mycart,
        }));
      },
      clearCart: () => set({ totalqty: 0, total: 0, cartContent: [] }),
      removeFromCart: (params) =>
        set((state: State) => ({
          total: state.total - params.price * params.quantity,
          totalqty: state.totalqty - params.quantity,
          cartContent: state.cartContent.filter(
            (item) => item.id !== params.id
          ),
        })),
    }),
    { name: "cart" }
  )
);

export default useCart;
