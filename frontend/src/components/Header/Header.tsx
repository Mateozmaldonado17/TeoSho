/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Navbar, Badge } from "keep-react";
import { ShoppingCart, User, ShoppingCartSimple, Gear } from "phosphor-react";
import { ShopType, useShoppingContext } from "../../context/shopping";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { isExpiredToken } from "../../utils";

export const Header: React.FC = (): JSX.Element => {
  const { shopping, isAuth, setIsAuth } = useShoppingContext();
  let totalPrice = 0;
  shopping.forEach((shop: ShopType) => {
    totalPrice = totalPrice + parseFloat(shop.price as string);
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isExpiredToken()) {
      setIsAuth(false);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  return (
    <Navbar fluid={true}>
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Brand>
          <Badge
            size="sm"
            colorType="strong"
            color="warning"
            icon={<ShoppingCartSimple size={18} />}
            iconPosition="left"
          >
            TeoShop!
          </Badge>
        </Navbar.Brand>

        <Navbar.Collapse collapseType="sidebar">
          <Navbar.Container tag="ul" className="flex flex-col gap-5">
            <Navbar.Link linkName="Products" />
            <Navbar.Link linkName="Create a new Product" />
          </Navbar.Container>
        </Navbar.Collapse>

        <Navbar.Container className="flex items-center gap-3">
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-5"
          >
            {!isAuth ? (
              <Link to="/sign-in">
                <Navbar.Link
                  icon={<User size={20} color="#444" />}
                  iconAnimation={false}
                />
              </Link>
            ) : (
              <>
                <Link to="/settings">
                  <Navbar.Link
                    icon={<Gear size={20} color="#444" />}
                    iconAnimation={false}
                  />
                </Link>
                <Button onClick={signOut} size="xs" type="primary">
                  Sign Out
                </Button>
              </>
            )}
          </Navbar.Container>

          <Link to="/shopping-cart">
            <Button size="xs" type="outlineGray">
              <span>
                <ShoppingCart size={20} color="#444" />
              </span>
              <span className="ml-1 text-metal-600">
                ({shopping.length}) Cart ${totalPrice}
              </span>
            </Button>
          </Link>

          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};
