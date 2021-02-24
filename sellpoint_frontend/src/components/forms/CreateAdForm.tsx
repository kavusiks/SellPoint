import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import AdAPI from "../../core/api/ad";
import { readDjangoError } from "../../core/client";
import { Ad } from "../../models/ad";
import { FormProps } from "./FormParts";

export const CreateAdForm: FunctionComponent<FormProps> = ({ setError }: FormProps) => {
  const history = useHistory();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imagePath, setImagePath] = useState<File | undefined>(undefined);
  const [validated, setValidated] = useState<boolean>(false);

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePath(e.target.files ? e.target.files[0] : undefined);
  };

  const renderImage = () => {
    if (!imagePath) {
      return null;
    }

    const preview = URL.createObjectURL(imagePath);
    return <Image style={{ maxWidth: "100%" }} src={preview} alt="Bilde" />;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setValidated(true);
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    const tempAd: Ad = {
      title: title,
      price: price,
      description: description,
    };

    AdAPI.createAd(tempAd)
      .then((ad) => {
        if (!ad.id) {
          setError("where my id >:(!");
          return;
        }

        if (!imagePath) {
          history.push(`/ad/${ad.id}`);
          return;
        }

        AdAPI.addImage(ad.id, imagePath).then((img) => {
          history.push(`/ad/${ad.id}`);
        });
      })
      .catch((error) => {
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Group as={Col} controlId="create-ad-title">
        <Form.Label>Tittel</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          placeholder="Tittel"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="create-ad-price">
        <Form.Label>Pris</Form.Label>
        <Form.Control
          type="number"
          placeholder="Pris"
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </Form.Group>
      ´{" "}
      <Form.Group as={Col} controlId="create-ad-description">
        <Form.Label>Beskrivelse</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Beskrivelse"
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group as={Col} controlId="create-ad-image">
        <Form.File label="Last opp bilde" onChange={updateImage} />
        {renderImage()}
      </Form.Group>
      <Button variant="primary" type="submit">
        Publiser annonsen
      </Button>
    </Form>
  );
};
export default CreateAdForm;
