/* eslint-disable react-refresh/only-export-components */
import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { IShop } from "../interfaces";

type ShopType = Partial<IShop>;

type ShoppingContent = {
  isAuth: boolean;
  shopping: ShopType[];
  setShopping: Dispatch<SetStateAction<ShopType[]>>;
};

const MyShoppingContext = createContext<ShoppingContent>({
  isAuth: false,
  shopping: [],
  setShopping: () => {},
});

const useShoppingContext = () => useContext(MyShoppingContext);

export type { ShopType, ShoppingContent };
export { MyShoppingContext, useShoppingContext };
