import { Spinner } from "keep-react";
import { Product } from "../../components";
import useFetch from "use-http";
import { IProduct } from "../../interfaces";
import { useCallback, useEffect, useState } from "react";
const Main = (): JSX.Element => {
  const [products, setProducts] = useState<IProduct[]>();
  const { get, loading, response } = useFetch("http://localhost:3000");

  const loadInitialProducts = useCallback(async () => {
    const products = await get("/product");
    if (response.ok) setProducts(products);
  }, [get, response.ok]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  return (
    <>
      {loading ? (
        <Spinner color="info" size="lg" />
      ) : (
        <div className="ps-10 pe-10 pt-10 flex flex-row flex-wrap gap-10">
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
      )}
    </>
  );
};

export default Main;
