import { Button, Card, Typography } from "keep-react";
import { IShop } from "../../interfaces";
import { ShopType, useShoppingContext } from "../../context/shopping";
import { TrashSimple } from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useBaseFetch } from "../../services";

const ShoppingCart = (): JSX.Element => {
  const navigate = useNavigate();
  const { shopping, setShopping, isAuth } = useShoppingContext();
  const { post, loading } = useBaseFetch();

  let totalPrice = 0;
  shopping.forEach((shop: ShopType) => {
    totalPrice = totalPrice + parseFloat(shop.price as string);
  });

  const removeToCart = (id: string) => {
    const itemRemoved = shopping.filter((item: ShopType) => {
      return item.productId !== id;
    });
    setShopping(itemRemoved);
  };

  const startBuy = async () => {
    const prepareItemsToBuy = shopping.map((item: ShopType) => {
      return {
        price: item.price,
        productId: item.product?.id,
      };
    });
    const request = await post("/shop", {
      items: prepareItemsToBuy,
    });
    if (request.count) {
      setShopping([]);
      navigate("/shopping");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-70 gap-5">
        <Typography variant="heading-6">
          Shopping Cart ({shopping.length})
        </Typography>
        {shopping?.map((shop: Partial<IShop>, key: number) => {
          return (
            <Card key={key} className="p-6 max-w-xl">
              <Card.Container className="flex items-start md:gap-5 gap-3.5">
                <Card.Container className="flex items-center justify-center rounded">
                  <img
                    alt="Product Image"
                    width={100}
                    height={100}
                    src={shop.product?.image}
                  />
                </Card.Container>
                <Card.Container className="flex flex-col gap-2">
                  <Card.Description>{shop.product?.name}</Card.Description>
                  <Button
                    onClick={() => removeToCart(String(shop.product?.id))}
                    size="xs"
                    type="primary"
                    circle={true}
                  >
                    <span>
                      <TrashSimple size={10} />
                    </span>
                  </Button>
                </Card.Container>
              </Card.Container>
            </Card>
          );
        })}
        <hr />
        Total: ${totalPrice}
        {isAuth ? (
          <Button
            className="w-full"
            size="md"
            color="success"
            disabled={loading}
            onClick={startBuy}
          >
            Buy
          </Button>
        ) : (
          <NavLink to="/sign-up">
            <Button className="w-full" size="md" type="primary">
              Sign Up
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
