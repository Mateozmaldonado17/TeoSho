import { Button, Navbar } from "keep-react";
import { ShoppingCart, User } from "phosphor-react";

export const Header = () => {
  return (
    <Navbar fluid={true}>
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Brand>TeoShop</Navbar.Brand>

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
            <Navbar.Link
              icon={<User size={20} color="#444" />}
              iconAnimation={false}
            />
          </Navbar.Container>

          <Button size="xs" type="outlineGray">
            <span>
              <ShoppingCart size={20} color="#444" />
            </span>
            <span className="ml-1 text-metal-600">Cart $0.00</span>
          </Button>
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};
