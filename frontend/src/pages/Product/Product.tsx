import useFetch from "use-http";
import { Button, Card } from "keep-react";
import { IProduct } from "../../interfaces";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Edit } from "./Partial";

const Product = (): JSX.Element => {
  const { id } = useParams();
  const request = useFetch("http://localhost:3000");
  const [showEditProductModal, setShowEditProductModal] =
    useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();
  const [productEdited, setProductEdited] = useState<IProduct>();

  const loadInitialProduct = useCallback(async () => {
    const product = await request.get(`/product/${id}`);
    setProduct(product);
    setProductEdited(product);
  }, [id, request]);

  useEffect(() => {
    loadInitialProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = () => {
    setProduct(productEdited);
    setShowEditProductModal(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const productEditedDraft = {
      ...product,
      [key]: e.target.value,
    };
    setProductEdited(productEditedDraft as IProduct);
  };

  return (
    <>
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
                  <Button className="w-full" size="xs" type="primary">
                    Add to cart
                  </Button>
                  <Button
                    size="xs"
                    type="default"
                    onClick={() => setShowEditProductModal(true)}
                    className="w-full"
                  >
                    Edit
                  </Button>
                  <Button className="w-full" size="xs" type="default">
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
