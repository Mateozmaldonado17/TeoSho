import { Button, Card } from "keep-react";
import { IProduct } from "../../interfaces";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Delete, Edit } from "./Partial";
import { useBaseFetch } from "../../services";
import { ShopType, useShoppingContext } from "../../context/shopping";

const Product = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shopping, setShopping } = useShoppingContext();
  const { get, patch, del } = useBaseFetch();
  const [showEditProductModal, setShowEditProductModal] =
    useState<boolean>(false);
  const [showDeleteProductModal, setShowDeleteProductModal] =
    useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();
  const [productEdited, setProductEdited] = useState<IProduct>();

  const loadInitialProduct = async () => {
    const product = await get(`/product/${id}`);
    if (product.statusCode === 404) {
      return navigate("/");
    }
    setProduct(product);
    setProductEdited(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    return () => {
      loadInitialProduct();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async () => {
    setProduct(productEdited);
    setShowEditProductModal(false);
    await patch("/product", {
      ...productEdited,
    });
    await loadInitialProduct();
  };

  const deleteProduct = async () => {
    await del("/product", {
      id: String(id),
    });
    await loadInitialProduct();
    navigate("/");
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const productEditedDraft = {
      ...product,
      [key]: e.target.value,
    };
    setProductEdited(productEditedDraft as IProduct);
  };

  const addToCart = () => {
    setShopping([
      ...shopping,
      {
        productId: id,
        price: product?.price,
        product,
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
    <>
      <Delete
        showDeleteProductModal={showDeleteProductModal}
        setShowDeleteProductModal={setShowDeleteProductModal}
        deleteProduct={deleteProduct}
      />
      <Edit
        setShowEditProductModal={setShowEditProductModal}
        showEditProductModal={showEditProductModal}
        updateProduct={updateProduct}
        product={product as IProduct}
        handleOnChange={handleOnChange}
      />
      <div className="flex justify-center">
        <Card className="max-w-2xl border-none">
          <Card.Container className="flex flex-col border-none justify-center">
            <Card.Container>
              <img
                height={204}
                width={373}
                alt="Product Image"
                src={product?.image}
                className="brightness-10 rounded-md	"
              />
            </Card.Container>
            <Card.Container className="md:px-6 px-3 gap-10 text-center pt-5">
              <Card.Title className="text-body-5  md:text-body-2 font-medium text-metal-700">
                {product?.name}
              </Card.Title>
              <Card.Description className="text-body-6 md:text-body-5 font-normal text-metal-500">
                {product?.description}
                <div className="flex flex-col gap-3 pt-5 justify-center">
                  <Button
                    className="w-full"
                    size="xs"
                    type="primary"
                    onClick={existProductIdInCart() ? removeToCart : addToCart}
                  >
                    {existProductIdInCart() ? "Remove item" : "Add to Cart"}
                  </Button>
                  <Button
                    size="xs"
                    type="default"
                    onClick={() => setShowEditProductModal(true)}
                    className="w-full"
                  >
                    Edit
                  </Button>
                  <Button
                    className="w-full"
                    size="xs"
                    type="default"
                    onClick={() => setShowDeleteProductModal(true)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Description>
            </Card.Container>
          </Card.Container>
        </Card>
      </div>
    </>
  );
};

export default Product;
