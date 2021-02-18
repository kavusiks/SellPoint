import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Address } from "../../models/user";

/**
 * Props for a form
 */
export interface FormProps {
  /**
   * Called whenever an error occurs
   *
   * @param error - The error message
   */
  setError: (error: string) => void;
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
          placeholder="Høyskoleringen 4"
          onChange={(e) => setLine1(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="form-address-line-2">
        <Form.Label>Addresselinje 2</Form.Label>
        <Form.Control
          type="text"
          placeholder="Leilighet 301"
          onChange={(e) => setLine2(e.target.value)}
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="form-address-country">
          <Form.Label>Land</Form.Label>
          <Form.Control
            type="text"
            placeholder="Norge"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="form-address-zip-code" style={{ maxWidth: "200px" }}>
          <Form.Label>Postkode</Form.Label>
          <Form.Control
            type="text"
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
            placeholder="Trondheim"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
      </Form.Row>
    </>
  );
};
