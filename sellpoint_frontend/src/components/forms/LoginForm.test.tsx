import React from "react";
import { useSessionContext } from "../../context/Session";
import Session from "../../models/session";
import { render, screen } from "@testing-library/react";
import { LoginForm } from "./LoginForm";

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

test("renders login form with email, password and remember me checkbox", () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render(<LoginForm setError={(error: string | React.ReactNode) => {}} />);

  mockedSession.mockReturnValue(() => mockSession);

  // Form handles most functionality internally so there is not much for
  // us to test but verifying that stuff appears as it should
  expectExists("Emailaddresse");
  expectExists("Passord");
  expectExists("Forbli innlogget");
});
