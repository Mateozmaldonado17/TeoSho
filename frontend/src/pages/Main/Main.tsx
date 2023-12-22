/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "keep-react";
import { Product } from "../../components";
import { IProduct } from "../../interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { useBaseFetch } from "../../services";
import { Add } from "./Partial";
import { useShoppingContext } from "../../context/shopping";
const Main = (): JSX.Element => {
  const { isAuth } = useShoppingContext();
  const [products, setProducts] = useState<IProduct[]>();
  const [newProduct, setNewProduct] = useState<IProduct>();
  const [showCreateNewProduct, setShowCreateNewProduct] =
    useState<boolean>(false);
  const { get, post, response } = useBaseFetch();

  const loadInitialProducts = async () => {
    setProducts([] as IProduct[]);
    const products = await get("/product");
    console.log("1!!@12!#@!31#12#12#1231");
    if (response.ok) setProducts(products);
  };

  useEffect(() => {
    return () => {
      loadInitialProducts();
    };
  }, []);

  const createNewProduct = async () => {
    const request = await post("/product", newProduct);
    if (request) {
      setShowCreateNewProduct(false);
      setNewProduct({} as IProduct);
    }
    setTimeout(async () => {
      await loadInitialProducts();
    }, 2000);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const productEditedDraft = {
      ...newProduct,
      [key]: e.target.value,
    };
    setNewProduct(productEditedDraft as IProduct);
  };

  return (
    <>
      <>
        <div className="ps-16 pe-10 pt-10">
          {isAuth && (
            <>
              <Add
                setShowCreateNewProduct={setShowCreateNewProduct}
                showCreateNewProduct={showCreateNewProduct}
                handleOnChange={handleOnChange}
                createNewProduct={createNewProduct}
              />
              <Button
                size="md"
                type="default"
                onClick={() => setShowCreateNewProduct(true)}
              >
                Add new Product
              </Button>
            </>
          )}
        </div>

        <div className="flex flex-row flex-wrap gap-10 ps-10 pe-10 pt-10">
          {products?.map((product: IProduct, key: number) => {
            return (
              <Product
                key={key}
                price={product.price}
                name={product.name}
                description={product.description}
                id={String(product.id)}
                image={product.image}
              />
            );
          })}
        </div>
      </>
    </>
  );
};

export default Main;
