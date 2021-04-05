import React, { FunctionComponent, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Category } from "../../models/ad";
import AdAPI from "../../core/api/ad";

export const CategoryDropdown: FunctionComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    AdAPI.getAllCategories().then((category) => setCategories(category.map((cat) => cat)));
  }, []);

  return (
    <>
      {categories
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((category) => (
          <Dropdown.Item key={category.id} eventKey={(category.id as unknown) as string}>
            {category.name}
          </Dropdown.Item>
        ))}
    </>
  );
};
