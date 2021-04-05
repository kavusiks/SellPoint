import React, { FunctionComponent } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Ad } from "../models/ad";
import { ArrowRightShort, ArrowDownUp, SortUp, SortDown } from "react-bootstrap-icons";

/**
 * A named method of sorting ads
 */
export interface SortingMethod {
  /**
   * The name of this method, as a react node
   */
  name: React.ReactNode;
  /**
   * The actual sorting method, implemented to be used on an array
   */
  sort: (a: Ad, b: Ad) => number;
  /**
   * Does this sorting method require authentication?
   */
  requireAuthenticated: boolean;
}

/**
 * A list of default sorting methods
 */
export const SORTING_METHODS: SortingMethod[] = [
  {
    name: (
      <span>
        <SortUp /> Avstand Lav <ArrowRightShort /> Høy
      </span>
    ),
    sort: (a: Ad, b: Ad) =>
      (a.distance ?? Number.MAX_SAFE_INTEGER) - (b.distance ?? Number.MAX_SAFE_INTEGER),
    requireAuthenticated: true,
  },
  {
    name: (
      <span>
        <SortDown /> Avstand Høy <ArrowRightShort /> Lav
      </span>
    ),
    sort: (a: Ad, b: Ad) =>
      (b.distance ?? Number.MAX_SAFE_INTEGER) - (a.distance ?? Number.MAX_SAFE_INTEGER),
    requireAuthenticated: true,
  },
  {
    name: (
      <span>
        <SortUp /> Pris Lav <ArrowRightShort /> Høy
      </span>
    ),
    sort: (a: Ad, b: Ad) => a.price - b.price,
    requireAuthenticated: false,
  },
  {
    name: (
      <span>
        <SortDown /> Pris Høy <ArrowRightShort /> Lav
      </span>
    ),
    sort: (a: Ad, b: Ad) => b.price - a.price,
    requireAuthenticated: false,
  },
];

/**
 * Props for the sorting method selector component
 */
export interface SortingSelectorProps {
  /**
   * The currently selected sorting method
   */
  selected: SortingMethod;
  /**
   * Updates the current sorting method with the newly selected one
   */
  setSortingMethod: (method: SortingMethod) => void;
  /**
   * If there is a user currently authenticated
   */
  authenticated: boolean;
}

/**
 * Component for selecting a sorting method for a list of ads
 *
 * @param props - The props
 */
export const SortingSelector: FunctionComponent<SortingSelectorProps> = ({
  selected,
  setSortingMethod,
  authenticated,
}) => {
  const select = (id: string | null) => {
    if (!id) {
      return;
    }

    setSortingMethod(SORTING_METHODS[+id]);
  };

  return (
    <>
      <Dropdown onSelect={(key) => select(key)}>
        <Dropdown.Toggle className="w-75 m-1" variant="outline-success" id="sorting-selector">
          <ArrowDownUp className="mr-2" /> Sorter Annonser
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {SORTING_METHODS.map((method, idx) => {
            return (
              <Dropdown.Item
                key={idx}
                eventKey={String(idx)}
                disabled={method === selected || (!authenticated && method.requireAuthenticated)}
              >
                {method.name}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Button className="w-75 m-1" variant="outline-info" disabled>
        {selected?.name}
      </Button>
    </>
  );
};
