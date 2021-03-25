import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form, FormCheck } from "react-bootstrap";
import { useHistory } from "react-router";
import AdAPI from "../../core/api/ad";
import { readDjangoError } from "../../core/client";
import { Ad } from "../../models/ad";
import { FormProps } from "./FormParts";
import { CategoriesForCreateAd } from "../category/CategoriesCreateAd";
import { AdImageMultipleFormPart, ImageFormData } from "./AdImageForm";

interface EditAdFormProps extends FormProps {
  initial: Ad;
}

interface BaseFormProps extends FormProps {
  buttonText: string;
  initial?: Ad;
  submitAd: (ad: Ad, images: ImageFormData[]) => void;
}

const BaseAdForm: FunctionComponent<BaseFormProps> = ({
  buttonText,
  initial,
  submitAd,
  setError,
}) => {
  const [title, setTitle] = useState<string>(initial?.title ?? "");
  const [price, setPrice] = useState<number>(initial?.price ?? 0);
  const [description, setDescription] = useState<string>(initial?.description ?? "");
  const [sold, setSold] = useState<boolean>(initial?.is_sold ?? false);
  const [validated, setValidated] = useState<boolean>(false);
  const [category, setCategory] = useState<number | undefined>(initial?.category ?? undefined);
  const [categoryTitle, setCategoryTitle] = useState<string>("Ikke valgt");

  // Not pretty but it will work. Either maps the existing images as their
  // form part object representations or just makes a new empty list.
  const [images, setImages] = useState<ImageFormData[]>(
    initial?.images
      ? initial.images.map((image, idx) => {
          return new ImageFormData({ id: idx, existing: image });
        })
      : [],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValidated(true);
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    const tempAd: Ad = {
      ...initial,
      title: title,
      price: price,
      description: description,
      category: category,
      is_sold: sold,
    };

    submitAd(tempAd, images);
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit} style={{ width: "100%" }}>
      <br />
      <Col>
        <p>
          <strong>Grunnleggende Informasjon</strong>
        </p>
        <hr style={{ margin: "5px 0px 5px 0px" }} />
      </Col>

      <Form.Group as={Col} controlId="form-ad-title">
        <Form.Label>Tittel</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          placeholder="Tittel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="form-ad-price">
        <Form.Label>Pris</Form.Label>
        <Form.Control
          type="number"
          placeholder="Pris"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="form-ad-description">
        <Form.Label>Beskrivelse</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Beskrivelse"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="create-ad-category">
        <Form.Label>Velg en kategori</Form.Label>
        <CategoriesForCreateAd
          chosenCategory={category}
          setChosenCategory={setCategory}
          categoryTitle={categoryTitle}
          setCategoryTitle={setCategoryTitle}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="form-ad-sold">
        <FormCheck>
          <FormCheck.Input checked={sold} onChange={() => setSold(!sold)} />
          <FormCheck.Label>Solgt</FormCheck.Label>
        </FormCheck>
      </Form.Group>

      <AdImageMultipleFormPart images={images} setImages={setImages} />

      <Button variant="primary" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
};

/**
 * Form for editing an existing ad
 *
 * @param props - The props
 */
export const EditAdForm: FunctionComponent<EditAdFormProps> = ({ initial, setError }) => {
  const history = useHistory();

  const onSubmit = (tempAd: Ad, images: ImageFormData[]) => {
    AdAPI.updateAd(tempAd)
      .then((ad) => {
        if (!ad.id) {
          setError("En uforventet error oppstod (Manglende ID)!");
          return;
        }

        const id: number = ad.id;
        Promise.all(images.map((image) => image.submit(id))).then(() =>
          history.push(`/ad/${ad.id}`),
        );
      })
      .catch((error) => {
        console.log(error);
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <BaseAdForm
      buttonText="Oppdater Annonsen"
      initial={initial}
      submitAd={onSubmit}
      setError={setError}
    />
  );
};

/**
 * Form for creating a new ad
 *
 * @param propts - The props
 */
export const CreateAdForm: FunctionComponent<FormProps> = ({ setError }: FormProps) => {
  const history = useHistory();

  const onSubmit = (tempAd: Ad, images: ImageFormData[]) => {
    AdAPI.createAd(tempAd)
      .then((ad) => {
        if (!ad.id) {
          setError("En uforventet error oppstod (Manglende ID)!");
          return;
        }

        const id: number = ad.id;
        Promise.all(images.map((image) => image.submit(id))).then(() =>
          history.push(`/ad/${ad.id}`),
        );
      })
      .catch((error) => {
        console.log(error);
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return <BaseAdForm buttonText="Publiser Annonsen" submitAd={onSubmit} setError={setError} />;
};
