import { IProduct } from ".";

interface IShop {
  id: number;
  userId: string;
  productId: string;
  price: string;
  boughtAt: string;
  product: IProduct;
}

export default IShop;
