import { Card, Badge, Button } from "keep-react";
import { ShoppingCart } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { ShopType, useShoppingContext } from "../../context/shopping";

interface IProduct {
  children?: React.ReactNode;
  price: string;
  name: string;
  description: string;
  id: string;
  image: string;
}

const Product = ({
  price,
  name,
  description,
  image,
  id,
}: IProduct): JSX.Element => {
  const { shopping, setShopping } = useShoppingContext();

  const addToCart = () => {
    setShopping([
      ...shopping,
      {
        productId: id,
        price,
      },
    ]);
  };

  const removeToCart = () => {
    const itemRemoved = shopping.filter((item: ShopType) => {
      return item.productId !== id;
    });
    setShopping(itemRemoved);
  };

  const existProductIdInCart = () => {
    return shopping.find((shop: ShopType) => {
      return shop.productId === id;
    });
  };

  return (
    <Card
      className="min-h-16 max-w-xs mx-auto overflow-hidden rounded-md"
      imgSrc={image}
      imgSize="md"
    >
      <Card.Container className="p-6">
        <Card.Container className="flex items-center justify-between">
          <Badge size="xs" colorType="light" color="gray">
            For Sale
          </Badge>
          <Card.Title>${price}</Card.Title>
        </Card.Container>
        <Card.Container className="my-3">
          <Card.Title>{name}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Container>
        <Card.Container className="flex items-center justify-start gap-5">
          <Button
            size="sm"
            type={existProductIdInCart() ? "outlineGray" : "primary"}
            onClick={existProductIdInCart() ? removeToCart : addToCart}
          >
            <span className="pr-2">
              <ShoppingCart size={24} />
            </span>
            {existProductIdInCart() ? "Remove item" : "Add to Cart"}
          </Button>
          <NavLink to={`/product/${id}`}>
            <Button size="sm" type="outlineGray">
              See More
            </Button>
          </NavLink>
        </Card.Container>
      </Card.Container>
    </Card>
  );
};

export default Product;
