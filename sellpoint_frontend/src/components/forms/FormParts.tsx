import React, { FunctionComponent, useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import User, { Address } from "../../models/user";
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

  editingUser?: User;

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
  editingUser,
  onChange,
}: AddressFormPartProps) => {
  const [line1, setLine1] = useState<string>(editingUser ? editingUser.address.line1 : "");
  const [line2, setLine2] = useState<string>(
    editingUser?.address.line2 ? editingUser.address.line2 : "",
  );

  const [city, setCity] = useState<string>(editingUser ? editingUser.address.city : "");
  const [country, setCountry] = useState<string>(editingUser ? editingUser.address.country : "");
  const [postalcode, setPostalcode] = useState<string>(
    editingUser ? editingUser.address.postalcode : "",
  );

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
          defaultValue={line1}
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
          defaultValue={line2}
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
            defaultValue={country}
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
            defaultValue={postalcode}
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
            defaultValue={city}
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
