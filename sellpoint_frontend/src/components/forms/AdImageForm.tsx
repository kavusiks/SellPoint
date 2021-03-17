import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Button, Col, Form, FormFile, Image } from "react-bootstrap";
import { Trash, Upload, Plus } from "react-bootstrap-icons";
import { AdImage } from "../../models/ad";
import AdAPI from "../../core/api/ad";
import { CenteredRow, SpaceBetweenCenterRow } from "../styled";
import "./forms.css";
import { ConfirmModal } from "../ConfirmModal";

export class ImageFormData {
  id: number;
  path?: File;
  description?: string;
  readonly existing?: AdImage;

  constructor({
    id,
    path,
    description,
    existing,
  }: {
    id: number;
    path?: File;
    description?: string;
    existing?: AdImage;
  }) {
    this.id = id;
    this.description = description;
    this.path = path;
    this.existing = existing;
  }

  existsRemotely = (): boolean => {
    return !!this.existing;
  };

  delete = async (): Promise<void> => {
    if (!this.existing) {
      throw new Error("Image doesn't exist remotely!");
    }

    await AdAPI.deleteImage(this.existing);
  };

  submit = (adId: number): Promise<AdImage | undefined> => {
    if (this.existsRemotely()) {
      return new Promise((resolve, reject) => resolve(undefined));
    }

    if (!this.path) {
      return new Promise((resolve, reject) => resolve(undefined));
    }

    return AdAPI.addImage(adId, this.path, this.description);
  };
}

interface ImageFormPartProps {
  data: ImageFormData;
  onRemove: (id: number) => void;
}

const EditImageFormPart: FunctionComponent<ImageFormPartProps> = ({ data, onRemove }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const confirmRemoveDialog = () => {
    setShowModal(false);
    data.delete().then(() => onRemove(data.id));
  };

  return (
    <>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        confirmMessage="Slett Bildet"
        onConfirm={confirmRemoveDialog}
      >
        Det går ikke ann å angre denne handlingen. Bildet vil bli slettet med en gang.
      </ConfirmModal>

      <div style={{ marginBottom: "10px" }}>
        <Form.Row as={SpaceBetweenCenterRow} noGutters>
          <p>Image {data.existing?.id}</p>

          <Button
            className="create-ad-image-delete-button"
            variant="danger"
            onClick={() => setShowModal(true)}
          >
            <CenteredRow>
              <Trash />
            </CenteredRow>
          </Button>
        </Form.Row>

        <Form.Group controlId={`create-ad-image-desc-${data.id}`}>
          <Form.Control
            value={data.existing?.description ?? ""}
            as="textarea"
            placeholder="Beskrivelse"
            rows={2}
            disabled
          />
        </Form.Group>

        <Image style={{ maxWidth: "100%" }} src={data.existing?.url} alt="Bilde" />
      </div>
    </>
  );
};

interface UploadImageFormPartProps extends ImageFormPartProps {
  onUpdate: (image: ImageFormData) => void;
}

const UploadImageFormPart: FunctionComponent<UploadImageFormPartProps> = ({
  data,
  onRemove,
  onUpdate,
}) => {
  const sendImageUpdate = () => {
    onUpdate(data);
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    data.path = e.target.files[0];
    sendImageUpdate();
  };

  const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    data.description = e.target.value;
    sendImageUpdate();
  };

  const renderImage = () => {
    if (!data.path) {
      return null;
    }

    const preview = URL.createObjectURL(data.path);
    return <Image style={{ maxWidth: "100%" }} src={preview} alt="Bilde" />;
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Form.Row as={SpaceBetweenCenterRow} noGutters>
        <Form.Group className="create-ad-image-file" controlId={`create-ad-image-file-${data.id}`}>
          <FormFile>
            <FormFile.Label className="btn btn-secondary create-ad-image-upload-button">
              <FormFile.Input onChange={updateImage} />
              <Upload style={{ margin: "0px 10px 3px 0px" }} />
              {data.path ? data.path.name : "Last Opp"}
            </FormFile.Label>
          </FormFile>
        </Form.Group>

        <Button
          className="create-ad-image-delete-button"
          variant="danger"
          onClick={() => onRemove(data.id)}
        >
          <CenteredRow>
            <Trash />
          </CenteredRow>
        </Button>
      </Form.Row>

      {data.path ? (
        <Form.Group controlId={`create-ad-image-desc-${data.id}`}>
          <Form.Control
            value={data.description}
            as="textarea"
            placeholder="Beskrivelse"
            rows={2}
            onChange={updateDescription}
          />
        </Form.Group>
      ) : null}

      {renderImage()}
    </div>
  );
};

export interface AdImageMultipleFormPartProps {
  images: ImageFormData[];
  setImages: (images: ImageFormData[]) => void;
}

export const AdImageMultipleFormPart: FunctionComponent<AdImageMultipleFormPartProps> = ({
  images,
  setImages,
}) => {
  const [id, setId] = useState<number>(images.length + 1);

  const addOne = useCallback(() => {
    setImages([...images, new ImageFormData({ id: id })]);
    setId(id + 1);
  }, [id, images, setImages]);

  useEffect(() => {
    if (images.length === 0) {
      addOne();
    }
  }, [addOne, images.length]);

  const receiveUpdate = (image: ImageFormData) => {
    const img = [...images];
    img[img.findIndex((other) => other.id === image.id)] = image;

    setImages(img);
  };

  const removeImage = (id: number) => {
    const img = [...images];
    const index = img.findIndex((image) => image.id === id);
    img.splice(index, 1);

    setImages(img);
  };

  const makeImageData = () => {
    const defaultProps = {
      onUpdate: receiveUpdate,
      onRemove: removeImage,
    };

    return images.map((image) => {
      return image.existsRemotely() ? (
        <EditImageFormPart key={image.id} data={image} {...defaultProps} />
      ) : (
        <UploadImageFormPart key={image.id} data={image} {...defaultProps} />
      );
    });
  };

  return (
    <Col>
      <SpaceBetweenCenterRow noGutters>
        <p>
          <strong>Bilder</strong>
        </p>

        <Button id="create-ad-image-amount-inc" variant="outline-secondary" onClick={addOne}>
          <CenteredRow>
            <Plus size={20} />
          </CenteredRow>
        </Button>
      </SpaceBetweenCenterRow>
      <hr style={{ margin: "5px 0px 5px 0px" }} />

      {makeImageData()}
    </Col>
  );
};
