import { MyShoppingContext } from "./context/shopping";
import { IProps } from "./interfaces";
import React, { useState } from "react";
import { ShopType } from "../src/context/shopping";

const App: React.FC<IProps> = ({ children }): JSX.Element => {
  const [shopping, setShopping] = useState<ShopType[]>([]);
  return (
    <>
      <MyShoppingContext.Provider value={{ shopping, setShopping }}>
        {children}
      </MyShoppingContext.Provider>
    </>
  );
};

export default App;
