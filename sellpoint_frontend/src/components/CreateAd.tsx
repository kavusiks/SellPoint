import { Console } from "console";
import React, { FunctionComponent, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Ad } from "../models/ad";


export const CreateAd: FunctionComponent<any> = () => {

    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    
    //Hva skal man putte bilde som?
    const [image, setImage] = useState<string>("");

    


    //Trenger å fikse en onSubmit
    const onSubmit = () =>{

        

        const ad: Ad = {
            title: title,
            price: price,
            description: description,
            image: image,
          };
        
        console.log(ad);



    }

    

    return (
      <Form>
            
        <Form.Group as={Col} controlId="create-ad-title">
            <Form.Label>Tittel</Form.Label>
            <Form.Control
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

        <Form.Group as={Col} controlId="create-ad-image">
            <Form.File 
                label="Legg til bilde" 

                //Skal man sette onChange på image?
                
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Publiser annonsen
        </Button>

      </Form>
    );
  };
  export default CreateAd;