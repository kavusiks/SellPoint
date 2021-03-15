import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { Button, Col, Form, FormFile, Image } from "react-bootstrap";
import { Trash, Upload, Plus } from "react-bootstrap-icons";
import { Address } from "../../models/user";
import { AdImage } from "../../models/ad";
import AdAPI from "../../core/api/ad";
import { CenteredRow, SpaceBetweenCenterRow } from "../styled";
import "./forms.css";

/**
 * Props for a form
 */
export interface FormProps {
  /**
   * Called whenever an error occurs
   *
   * @param error - The error message
   */
  setError: (error: string | React.ReactNode) => void;
}

/**
 * Props for the Address form part
 */
export interface AddressFormPartProps {
  /**
   * Called whenever the address changes
   *
   * @param address - The new address
   */
  onChange: (address: Address) => void;
}

/**
 * Utility component, simplifying accepting an address as an input
 * by abstracting out those fields and directly passing an {@link Address}
 * to the #onChange() function.
 *
 * @param props - The props
 */
export const AddressFormPart: FunctionComponent<AddressFormPartProps> = ({
  onChange,
}: AddressFormPartProps) => {
  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalcode, setPostalcode] = useState<string>("");

  // Since useEffect is called when its dependencies change, this will
  // be called whenever a field is updated
  useEffect(() => {
    const address: Address = {
      line1: line1,
      line2: line2,
      city: city,
      country: country,
      postalcode: postalcode,
    };

    onChange(address);
  }, [line1, line2, city, country, postalcode, onChange]);

  return (
    <>
      <Form.Group controlId="form-address-line-1">
        <Form.Label>Addresselinje 1</Form.Label>
        <Form.Control
          type="text"
          pattern="^[a-zA-Z\p{L}0-9\s]+$"
          minLength={4}
          placeholder="Høyskoleringen 4"
          onChange={(e) => setLine1(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-address-line-2">
        <Form.Label>Addresselinje 2</Form.Label>
        <Form.Control
          type="text"
          pattern="^[a-zA-Z\p{L}0-9\s]+$"
          minLength={4}
          placeholder="Leilighet 301"
          onChange={(e) => setLine2(e.target.value)}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="form-address-country">
          <Form.Label>Land</Form.Label>
          <Form.Control
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={4}
            placeholder="Norge"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form-address-zip-code" style={{ maxWidth: "200px" }}>
          <Form.Label>Postkode</Form.Label>
          <Form.Control
            type="text"
            pattern="[0-9]*"
            maxLength={4}
            minLength={4}
            placeholder="7030"
            onChange={(e) => setPostalcode(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="form-address-city">
          <Form.Label>By</Form.Label>
          <Form.Control
            type="text"
            pattern="^[a-zA-Z\p{L}]+$"
            minLength={4}
            placeholder="Trondheim"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
    </>
  );
};

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
  const openRemoveDialog = () => {
    // TODO: Add confirm modal and delete image remotely.

    onRemove(data.id);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Form.Row as={SpaceBetweenCenterRow} noGutters>
        <p>Image {data.existing?.id}</p>

        <Button
          className="create-ad-image-delete-button"
          variant="danger"
          onClick={openRemoveDialog}
        >
          <CenteredRow>
            <Trash />
          </CenteredRow>
        </Button>
      </Form.Row>

      <Form.Group controlId={`create-ad-image-desc-${data.id}`}>
        <Form.Control
          value={data.existing?.description}
          as="textarea"
          placeholder="Beskrivelse"
          rows={2}
          disabled
        />
      </Form.Group>

      <Image style={{ maxWidth: "100%" }} src={data.existing?.url} alt="Bilde" />
    </div>
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

export interface SubmitImageMultipleFormPartProps {
  images: ImageFormData[];
  setImages: (images: ImageFormData[]) => void;
}

export const SubmitImageMultipleFormPart: FunctionComponent<SubmitImageMultipleFormPartProps> = ({
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
