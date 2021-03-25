import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ButtonGroup, DropdownButton, Button } from "react-bootstrap";
import AdAPI from "../../core/api/ad";
import { Ad, Category } from "../../models/ad";
import { CategoryDropdown } from "./CategoryDropdown";

export interface FilterAdsByCategoryProps {
  setFilteredAds: (filteredAds: Ad[]) => void;
}

export const CategoriesForFilterAds: FunctionComponent<FilterAdsByCategoryProps> = ({
  setFilteredAds,
}) => {
  const [chosenCategories, setChosenCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<Ad[]>([]);

  useEffect(() => {
    AdAPI.getAllAds().then((ads) => setAllItems(ads));
  }, []);

  useEffect(() => {
    if (chosenCategories.length === 0) {
      setFilteredAds(allItems);
      return;
    }

    Promise.all(
      chosenCategories.map((category) => AdAPI.getAdsbyCategoryId(category.id)),
    ).then((results) => setFilteredAds(results.reduce((res1, res2) => res1.concat(res2))));
  }, [allItems, chosenCategories, setFilteredAds]);

  const handleSelect = async (e: string | null) => {
    if (e == null) {
      throw new Error("e is null");
    }

    const tempCat = await AdAPI.getCategoryById((e as unknown) as number);

    chosenCategories.filter((category) => category.id === tempCat.id).length === 0
      ? setChosenCategories((state) => [...state, tempCat])
      : void 0;
  };

  const makeChosenCategoriesButtons = () => {
    return chosenCategories.map((category) => {
      return (
        <Button
          variant="success"
          onClick={handleRemoveCategory}
          key={category.id}
          id={(category.id as unknown) as string}
        >
          {category.name + " x"}
        </Button>
      );
    });
  };

  const handleRemoveCategory = async (e: any) => {
    if (e == null) {
      throw new Error("e is null");
    }

    const tempId = e.currentTarget.id as number;
    const tempCat = await AdAPI.getCategoryById(tempId);
    setChosenCategories((state) => state.filter((category) => category.id !== tempCat.id));
  };

  return (
    <Fragment>
      <br />
      <DropdownButton
        title="Velg kategorier"
        variant="outline-success"
        id="dropdown-basic"
        onSelect={handleSelect}
      >
        <CategoryDropdown />
      </DropdownButton>
      <br />
      <ButtonGroup vertical>{makeChosenCategoriesButtons()}</ButtonGroup>
    </Fragment>
  );
};
