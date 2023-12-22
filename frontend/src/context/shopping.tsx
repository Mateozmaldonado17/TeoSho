/* eslint-disable react-refresh/only-export-components */
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { IShop } from "../interfaces";

type ShopType = Partial<IShop>;

type ShoppingContent = {
  shopping: ShopType[];
  setShopping: Dispatch<SetStateAction<ShopType[]>>;
};

const MyShoppingContext = createContext<ShoppingContent>({
  shopping: [],
  setShopping: () => {},
});

const useShoppingContext = () => useContext(MyShoppingContext);

export type { ShopType, ShoppingContent };
export { MyShoppingContext, useShoppingContext };
