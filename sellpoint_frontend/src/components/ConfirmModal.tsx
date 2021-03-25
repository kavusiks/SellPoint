import React, { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";

/**
 * Props for the ConfirmModal
 */
export interface ConfirmModalProps {
  /**
   * If the modal should be currently open
   */
  show: boolean;
  /**
   * Function for updating if the modal should be open
   */
  setShow: (show: boolean) => void;
  /**
   * The title of the modal
   */
  title?: string;
  /**
   * The text displayed on the confirm button
   */
  confirmMessage?: string;
  /**
   * Any child nodes. Will be displayed as part of the modal body
   */
  children?: React.ReactNode;
  /**
   * Function to be called when user clicks the confirm button
   */
  onConfirm: () => void;
}

/**
 * Simple dialog for confirming an action that may be considered dangerous,
 * and is not possible to undo, e. g. deleting something
 *
 * @param props - The props
 */
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
