import { Button } from "keep-react";
import { Person, ShoppingBag } from "phosphor-react";
import { NavLink } from "react-router-dom";

const AccountButtonGroup = (): JSX.Element => {
  return (
    <Button.Group className="min-w-full justify-center">
      <NavLink to="/settings">
        <Button type="primary" positionInGroup="start">
          <span className="pr-2">
            <Person size={24} />
          </span>
          Account
        </Button>
      </NavLink>
      <NavLink to="/shopping">
        <Button type="primary" positionInGroup="end">
          <span className="pr-2">
            <ShoppingBag size={24} />
          </span>
          Shopping
        </Button>
      </NavLink>
    </Button.Group>
  );
};

export default AccountButtonGroup;
