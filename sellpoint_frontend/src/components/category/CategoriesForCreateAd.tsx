import React, { Fragment, FunctionComponent, useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import AdAPI from "../../core/api/ad";
import { CategoryDropdown } from "../category/CategoryDropdown";

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
  const handleSelect = async (e: string | number | null) => {
    if (e == null) {
      throw new Error("e is null");
    }
    if (e === "None") {
      setChosenCategory(undefined);
      setCategoryTitle("Ikke valgt");
    } else {
      setChosenCategory(e as number);
      setCategoryTitle((await AdAPI.getCategoryById(e as number)).name);
    }
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
