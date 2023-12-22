import { Button, Modal } from "keep-react";
import { PencilCircle } from "phosphor-react";

interface IPartialProductDelete {
  children?: React.ReactNode;
  showDeleteProductModal: boolean;
  setShowDeleteProductModal: (attr1: boolean) => void;
  deleteProduct: () => Promise<void>;
}

const Delete = (props: IPartialProductDelete): JSX.Element => {
  const { showDeleteProductModal, setShowDeleteProductModal, deleteProduct } =
    props;

  return (
    <Modal
      icon={<PencilCircle size={28} color="#1B4DFF" />}
      size="md"
      show={showDeleteProductModal}
      position="top-center"
    >
      <Modal.Header>Are you sure?</Modal.Header>
      <Modal.Footer>
        <Button
          type="outlineGray"
          onClick={() => setShowDeleteProductModal(false)}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={deleteProduct}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Delete;
