import { Button, Label, Modal, TextInput } from "keep-react";
import { ChangeEvent } from "react";
import { PencilCircle } from "phosphor-react";
import { IProduct } from "../../../../interfaces";

interface IPartialProduct {
  children?: React.ReactNode;
  product: IProduct;
  showEditProductModal: boolean;
  setShowEditProductModal: (attr1: boolean) => void;
  updateProduct: () => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
}

const Edit = (props: IPartialProduct): JSX.Element => {
  const {
    showEditProductModal,
    setShowEditProductModal,
    updateProduct,
    product,
    handleOnChange,
  } = props;

  return (
    <Modal
      icon={<PencilCircle size={28} color="#1B4DFF" />}
      size="md"
      show={showEditProductModal}
      position="top-center"
    >
      <Modal.Header>Edit Product</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label htmlFor="#id-0" value="ID" />
            <TextInput
              disabled
              id="#id-0"
              placeholder={String(product?.id)}
              color="gray"
            />
          </div>
          <div>
            <Label htmlFor="#id-1" value="Name" />
            <TextInput
              handleOnChange={(e) => handleOnChange(e, "name")}
              id="#id-1"
              value={product?.name}
              color="gray"
            />
          </div>
          <div>
            <Label htmlFor="#id-2" value="Description" />
            <TextInput
              handleOnChange={(e) => handleOnChange(e, "description")}
              id="#id-2"
              value={product?.description}
              color="gray"
            />
          </div>
          <div>
            <Label htmlFor="#id-3" value="Price" />
            <TextInput
              handleOnChange={(e) => handleOnChange(e, "price")}
              id="#id-3"
              value={product?.price}
              color="gray"
            />
          </div>
          <div>
            <Label htmlFor="#id-4" value="Image" />
            <TextInput
              handleOnChange={(e) => handleOnChange(e, "image")}
              id="#id-4"
              value={product?.image}
              color="gray"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="outlineGray"
          onClick={() => setShowEditProductModal(false)}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={updateProduct}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
