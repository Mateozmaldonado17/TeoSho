import { Card, Badge, Button } from "keep-react";
import { ShoppingCart } from "phosphor-react";

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
}: IProduct): JSX.Element => {
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
          <Button size="sm" type="outlineGray">
            <span className="pr-2">
              <ShoppingCart size={24} />
            </span>
            Add To Cart
          </Button>
          <Button size="sm" type="outlineGray">
            See More
          </Button>
        </Card.Container>
      </Card.Container>
    </Card>
  );
};

export default Product;
