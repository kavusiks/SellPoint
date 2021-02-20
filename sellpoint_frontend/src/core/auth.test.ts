import client from "./client";
import AuthenticationService, { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN } from "./auth";
import { AxiosRequestConfig } from "axios";

jest.mock("./client");

const clientMock = client as jest.Mocked<typeof client>;

describe("AuthenticationService", () => {
  type RequestData = {
    email: string;
    password: string;
  };

  const data: RequestData = {
    email: "test@test.org",
    password: "password",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("logged in when cookie set", () => {
    AuthenticationService.cookies.get = jest
      .fn()
      .mockImplementation((cookie: string, options?: any) => {
        return cookie === COOKIE_REFRESH_TOKEN ? "EXISTING_COOKIE" : undefined;
      });

    expect(AuthenticationService.isLoggedIn()).toBeTruthy();
  });

  it("not logged in when cookie not set", () => {
    jest.spyOn(AuthenticationService.cookies, "get").mockReturnValue(() => undefined);

    expect(AuthenticationService.isLoggedIn()).toBeTruthy();
  });

  it("cookies to be removed when logging out", () => {
    const spy = jest.spyOn(AuthenticationService.cookies, "remove");

    AuthenticationService.logOut();

    expect(spy).toHaveBeenCalledWith(COOKIE_ACCESS_TOKEN);
    expect(spy).toHaveBeenCalledWith(COOKIE_REFRESH_TOKEN);
  });

  it("throws error when invalid credentials", () => {
    clientMock.post.mockImplementation(
      (url: string, options?: AxiosRequestConfig | undefined) =>
        new Promise((resolve, reject) => {
          expect(options).toBeTruthy();

          const reqData = options as RequestData;
          expect(reqData.email).toEqual(data.email);
          expect(reqData.password).toEqual(data.password);

          reject(new Error("TEST_ERROR"));
        }),
    );

    expect.assertions(4);
    return expect(
      AuthenticationService.login(data.email, data.password, false),
    ).rejects.toBeTruthy();
  });

  it("successfully logs in when valid credentials", async () => {
    const response = {
      refresh: "REFRESH_TOKEN",
      access: "ACCESS_TOKEN",
    };

    clientMock.post.mockImplementation(
      (url: string, options?: AxiosRequestConfig | undefined) =>
        new Promise((resolve, reject) => {
          expect(options).toBeTruthy();

          const reqData = options as RequestData;
          expect(reqData.email).toEqual(data.email);
          expect(reqData.password).toEqual(data.password);

          resolve({ data: response });
        }),
    );

    const spy = jest.spyOn(AuthenticationService.cookies, "set");

    const tokens = await AuthenticationService.login(data.email, data.password, false);

    expect(tokens.access).toEqual(response.access);
    expect(tokens.refresh).toEqual(response.refresh);
    expect(spy).toBeCalledTimes(2);
  });

  it("throw error when not logged in and getting refresh token", () => {
    AuthenticationService.cookies.get = jest
      .fn()
      .mockImplementation((cookie: string, options?: any) => {
        return cookie === COOKIE_REFRESH_TOKEN ? undefined : "EXISTING_COOKIE";
      });

    expect(() => AuthenticationService.getRefreshToken()).toThrowError();
  });
});
