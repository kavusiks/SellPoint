import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Col, Form, FormFile, Image } from "react-bootstrap";
import { Trash, Upload, Plus } from "react-bootstrap-icons";
import { Address } from "../../models/user";
import { AdImage, Category } from "../../models/ad";
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

export interface CategoryProps extends FormProps {
  categories: Category[];
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

export class ImageSingleFormData {
  id: number;
  readonly path?: File;
  readonly description?: string;

  constructor(id: number, path?: File, description?: string) {
    this.id = id;
    this.description = description;
    this.path = path;
  }

  submit = (adId: number): Promise<AdImage> => {
    if (!this.path) {
      throw new Error("Missing path!");
    }

    return AdAPI.addImage(adId, this.path, this.description);
  };
}

interface SubmitImageSingleFormPartProps {
  id: number;
  onRemove: (id: number) => void;
  onUpdate: (image: ImageSingleFormData) => void;
  initialDescription?: string;
  initialPath?: File;
}

const SubmitImageSingleFormPart: FunctionComponent<SubmitImageSingleFormPartProps> = ({
  id,
  onRemove,
  onUpdate,
  initialPath,
  initialDescription,
}) => {
  const [path, setPath] = useState<File | undefined>(initialPath);
  const [description, setDescription] = useState<string | undefined>(initialDescription);

  const sendImageUpdate = () => {
    const image = new ImageSingleFormData(id, path, description);
    onUpdate(image);
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.files ? e.target.files[0] : undefined);
    sendImageUpdate();
  };

  const updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    sendImageUpdate();
  };

  const renderImage = () => {
    if (!path) {
      return null;
    }

    const preview = URL.createObjectURL(path);
    return <Image style={{ maxWidth: "100%" }} src={preview} alt="Bilde" />;
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Form.Row as={SpaceBetweenCenterRow} noGutters>
        <Form.Group className="create-ad-image-file" controlId={`create-ad-image-file-${id}`}>
          <FormFile>
            <FormFile.Label className="btn btn-secondary create-ad-image-upload-button">
              <FormFile.Input onChange={updateImage} />
              <Upload style={{ margin: "0px 10px 3px 0px" }} />
              {path ? path.name : "Last Opp"}
            </FormFile.Label>
          </FormFile>
        </Form.Group>

        <Button
          className="create-ad-image-delete-button"
          variant="danger"
          onClick={() => onRemove(id)}
        >
          <CenteredRow>
            <Trash />
          </CenteredRow>
        </Button>
      </Form.Row>

      {path ? (
        <Form.Group controlId={`create-ad-image-desc-${id}`}>
          <Form.Control
            value={description}
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
  onUpdate: (images: ImageSingleFormData[]) => void;
  initialAmount?: number;
}

export const SubmitImageMultipleFormPart: FunctionComponent<SubmitImageMultipleFormPartProps> = ({
  initialAmount = 1,
  onUpdate,
}) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [id, setId] = useState<number>(1);
  const [images, setImages] = useState<ImageSingleFormData[]>([new ImageSingleFormData(id)]);

  const getNextId = () => {
    setId((i) => i + 1);
    return id + 1;
  };

  const addOne = () => {
    setAmount((a) => a + 1);
    setImages([...images, new ImageSingleFormData(getNextId())]);
  };

  const receiveUpdate = (image: ImageSingleFormData) => {
    const img = [...images];
    img[img.findIndex((other) => other.id === image.id)] = image;

    setImages(img);
    onUpdate(img);
  };

  const removeImage = (id: number) => {
    const img = [...images];
    const index = img.findIndex((image) => image.id === id);
    img.splice(index, 1);

    setImages(img);
    setAmount(amount - 1);
  };

  const makeImageData = () => {
    return images.map((image) => {
      return (
        <SubmitImageSingleFormPart
          key={image.id}
          {...image}
          onUpdate={receiveUpdate}
          onRemove={removeImage}
        />
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
