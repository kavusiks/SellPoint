import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import AdAPI from "../../core/api/ad";
import { readDjangoError } from "../../core/client";
import { Ad } from "../../models/ad";
import { CenteredRow } from "../styled";
import { FormProps, SubmitImageMultipleFormPart, ImageSingleFormData } from "./FormParts";

export const CreateAdForm: FunctionComponent<FormProps> = ({ setError }: FormProps) => {
  const history = useHistory();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<ImageSingleFormData[]>([]);
  const [validated, setValidated] = useState<boolean>(false);

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
    <Form noValidate validated={validated} onSubmit={onSubmit} style={{ width: "100%" }}>
      <br />
      <Col>
        <p>
          <strong>Grunnleggende Informasjon</strong>
        </p>
        <hr style={{ margin: "5px 0px 5px 0px" }} />
      </Col>

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

      <SubmitImageMultipleFormPart onUpdate={setImages} />

      <Button variant="primary" type="submit">
        Publiser annonsen
      </Button>
    </Form>
  );
};
export default CreateAdForm;