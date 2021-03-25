import React, { Fragment, FunctionComponent, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AdAPI from "../../core/api/ad";
import { CategoryDropdown } from "./CategoryDropdown";

export interface CreateAdCategoryProps {
  chosenCategory: number | undefined;
  setChosenCategory: (chosenCategory: number | undefined) => void;
  categoryTitle: string;
  setCategoryTitle: (categoryTitle: string) => void;
}

export const CategoriesForCreateAd: FunctionComponent<CreateAdCategoryProps> = ({
  chosenCategory,
  setChosenCategory,
  categoryTitle,
  setCategoryTitle,
}) => {
  useEffect(() => {
    if (chosenCategory !== undefined) {
      AdAPI.getCategoryById(chosenCategory).then((category) => setCategoryTitle(category.name));
    } else {
      setCategoryTitle("Ikke valgt");
    }
  }, [chosenCategory, setCategoryTitle]);

  const handleSelect = async (e: string | number | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    setChosenCategory(e === "None" ? undefined : (e as number));
  };

  return (
    <Fragment>
      <DropdownButton
        title={categoryTitle}
        variant="outline-secondary"
        id="dropdown-basic"
        onSelect={handleSelect}
      >
        {chosenCategory ? (
          <>
            <Dropdown.Item key={0} eventKey="None">
              Ingen
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        ) : null}
        <CategoryDropdown />
      </DropdownButton>
    </Fragment>
  );
};
