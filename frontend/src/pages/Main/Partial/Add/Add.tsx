import { Button, Label, Modal, TextInput } from "keep-react";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent } from "react";

interface IPartialProduct {
  children?: React.ReactNode;
  showCreateNewProduct: boolean;
  setShowCreateNewProduct: (attr1: boolean) => void;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
  createNewProduct: () => void;
}

const Add = (props: IPartialProduct): JSX.Element => {
  const {
    showCreateNewProduct,
    setShowCreateNewProduct,
    handleOnChange,
    createNewProduct,
  } = props;

  return (
    <Modal
      icon={<PlusCircle size={28} color="#1B4DFF" />}
      size="md"
      show={showCreateNewProduct}
      position="top-center"
    >
      <Modal.Header>Add Product</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <Label htmlFor="#id-1" value="Name" />
            <TextInput
              id="#id-1"
              color="gray"
              handleOnChange={(e) => handleOnChange(e, "name")}
            />
          </div>
          <div>
            <Label htmlFor="#id-2" value="Description" />
            <TextInput
              id="#id-2"
              color="gray"
              handleOnChange={(e) => handleOnChange(e, "description")}
            />
          </div>
          <div>
            <Label htmlFor="#id-3" value="Price" />
            <TextInput
              id="#id-3"
              color="gray"
              handleOnChange={(e) => handleOnChange(e, "price")}
            />
          </div>
          <div>
            <Label htmlFor="#id-4" value="Image" />
            <TextInput
              id="#id-4"
              color="gray"
              handleOnChange={(e) => handleOnChange(e, "image")}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="outlineGray"
          onClick={() => setShowCreateNewProduct(false)}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={createNewProduct}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
