import { Button, Card, Typography } from "keep-react";
import { ShoppingBag, Person } from "phosphor-react";
import { useBaseFetch } from "../../services";
import { useEffect, useState } from "react";
import { isExpiredToken } from "../../utils";
import { useNavigate } from "react-router-dom";
import { IShop } from "../../interfaces";
import TimeAgo from "timeago-react";

const Shopping = (): JSX.Element => {
  const navigate = useNavigate();
  const { get } = useBaseFetch();
  const [shop, setShop] = useState<IShop[]>([]);

  const getAllMyShops = async () => {
    const request = await get("/shop");
    if (request) {
      setShop(request);
    }
  };

  useEffect(() => {
    if (isExpiredToken()) {
      navigate("/");
    }
    getAllMyShops();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-80 gap-5">
        <Button.Group className="min-w-full justify-center">
          <Button type="primary" positionInGroup="start">
            <span className="pr-2">
              <Person size={24} />
            </span>
            Account
          </Button>
          <Button type="primary" positionInGroup="end">
            <span className="pr-2">
              <ShoppingBag size={24} />
            </span>
            Shopping
          </Button>
        </Button.Group>
        <Typography variant="heading-6">Shopping</Typography>
        {shop?.map((shop: IShop, key: number) => {
          return (
            <Card key={key} className="p-6 max-w-xl">
              <Card.Container className="flex items-start md:gap-5 gap-3.5">
                <Card.Container className="flex items-center justify-center rounded">
                  <img
                    alt="Product Image"
                    width={100}
                    height={100}
                    src={shop.product.image}
                  />
                </Card.Container>
                <Card.Container className="flex flex-col gap-2">
                  <Card.Description>
                    {shop.product.name} <br />
                    <TimeAgo datetime={shop.boughtAt} locale="us" />
                  </Card.Description>
                </Card.Container>
              </Card.Container>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Shopping;
