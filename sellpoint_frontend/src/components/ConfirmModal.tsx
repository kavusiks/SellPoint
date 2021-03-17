import React, { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

export interface ConfirmModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  title?: string;
  confirmMessage?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = ({
  show,
  setShow,
  title = "Er du sikker?",
  confirmMessage = "Ok",
  children,
  onConfirm,
}) => {
  const confirm = () => {
    setShow(false);
    onConfirm();
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Avbryt
        </Button>
        <Button variant="danger" onClick={confirm}>
          {confirmMessage}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
