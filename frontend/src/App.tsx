import { MyShoppingContext } from "./context/shopping";
import { IProps } from "./interfaces";
import React, { useEffect, useState } from "react";
import { ShopType } from "../src/context/shopping";
import { isExpiredToken } from "./utils";

const App: React.FC<IProps> = ({ children }): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [shopping, setShopping] = useState<ShopType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isExpiredToken()) {
      setIsAuth(true);
    }
  }, []);
  return (
    <>
      <MyShoppingContext.Provider
        value={{ shopping, setShopping, isAuth, setIsAuth }}
      >
        {children}
      </MyShoppingContext.Provider>
    </>
  );
};

export default App;
