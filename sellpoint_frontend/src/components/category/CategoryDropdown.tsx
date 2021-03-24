import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { Category } from "../../models/ad";
import AdAPI from "../../core/api/ad";
import { Row, Col, DropdownButton, Button, ButtonGroup } from "react-bootstrap";

/*
export interface CategoryProps {
  //categories: Category[];
}*/

export const CategoryDropdown: FunctionComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    //AdAPI.getAllAds().then((ads) => setItems(ads));
    AdAPI.getAllCategories().then((category) => setCategories(category.map((cat) => cat)));
  }, []);
  //categories.forEach((category) => console.log(category.id));
  return (
    <Fragment>
      {categories
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((category) => (
          <Dropdown.Item key={category.id} eventKey={(category.id as unknown) as string}>
            {category.name}
          </Dropdown.Item>
        ))}
    </Fragment>
  );
};
