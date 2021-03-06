import React, { FunctionComponent, useState } from "react";
import { Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { Ad } from "../../models/ad";
import { ConfirmModal } from "../ConfirmModal";
import AdAPI from "../../core/api/ad";

/**
 * Generic props for any component that interacts with a single Ad
 */
export interface AdComponentProps {
  /**
   * The ad
   */
  ad: Ad;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
}

/**
 * Props for the AdModifyDialog
 */
export interface AdModifyProps extends AdComponentProps {
  /**
   * Function to be called after the ad has been deleted
   */
  onDeleted: () => void;
}

/**
 * Generic buttons for editing and deleting an ad
 *
 * @param props - The props
 */
export const AdModifyDialog: FunctionComponent<AdModifyProps> = ({ ad, children, onDeleted }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteAdDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowModal(true);
  };

  const deleteAd = () => {
    AdAPI.deleteAd(ad).then(onDeleted);
  };

  const editAd = (e: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/ad/${ad.id}/edit`);
  };

  return (
    <>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        onConfirm={deleteAd}
        confirmMessage="Slett Annonsen"
      >
        Det går ikke ann å angre denne handlingen. Annonsen &apos;{ad.title}&apos; vil bli slettet
        med en gang.
      </ConfirmModal>

      <Button variant="danger" onClick={deleteAdDialog} style={{ marginRight: "10px" }}>
        <Trash size={24} style={{ margin: "-1px -4px 1px -4px" }} />
      </Button>
      <Button variant="primary" onClick={editAd}>
        <Pencil size={24} style={{ margin: "-1px -4px 1px -4px" }} />
      </Button>
      {children}
    </>
  );
};
