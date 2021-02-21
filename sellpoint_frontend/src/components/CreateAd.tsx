import { Console } from "console";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form} from "react-bootstrap";
import client from "../core/client";
import { Ad } from "../models/ad";
import AdService from "../core/ad"


export const CreateAd: FunctionComponent<any> = () => {

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    
    //Hva skal man putte bilde som?
    const [image, setImage] = useState<string>();
    const [validated, setValidated] = useState<boolean>(false);

    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{

        setValidated(true);
        e.preventDefault();
    
        const form = e.target as HTMLFormElement;
        if (!form.checkValidity()) {
          e.stopPropagation();
          return;
        }
    

        const ad: Ad = {
            title: title,
            price: price,
            description: description,
            image: image,
          };
        
        AdService.createAd(ad);

    }

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
´        <Form.Group as={Col} controlId="create-ad-description">
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
            <Form.File 
                label="Legg til bilde" 

                //Skal man sette onChange på image?
                onChange={(e: any) => setImage(e.target.files[0])}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Publiser annonsen
        </Button>

      </Form>
    );
  };
  export default CreateAd;