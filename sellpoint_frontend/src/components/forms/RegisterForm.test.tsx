import React from "react";
import { useSessionContext } from "../../context/Session";
import Session from "../../models/session";
import { render, screen } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";

jest.mock("../../context/Session");

const mockedSession = (useSessionContext as unknown) as jest.Mock<typeof useSessionContext>;
const mockSession: Session = {
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRedirectPath: (path: string | undefined) => {},
  updateSelfUser: () => new Promise<void>((resolve, reject) => resolve()),
};

const expectExists = (label: string) => {
  const formElement = screen.getByLabelText(label);
  expect(formElement).toBeInTheDocument();
};


test("renders register form expected fields", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(<RegisterForm setError={(error: string | React.ReactNode) => {}} />);

  mockedSession.mockReturnValue(() => mockSession);

  // Form handles most functionality internally so there is not much for
  // us to test but verifying that stuff appears as it should
  expectExists("Fornavn");
  expectExists("Etternavn");
  expectExists("Email");
  expectExists("Passord");
  expectExists("Gjenta passord");
  expectExists("Telefonnummer");
  expectExists("Addresselinje 1");
  expectExists("Addresselinje 2");
  expectExists("Land");
  expectExists("Postkode");
  expectExists("By");
});