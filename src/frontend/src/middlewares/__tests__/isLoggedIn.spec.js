import { isLoggedIn } from "@/middlewares";

describe('isLoggedIn', () => {
  const next = jest.fn();

  const nextMiddleware = jest.fn();

  const store = {
    $jwt: {
      getToken: jest.fn(),
    }
  }

  describe("isn't authorized", () => {
    beforeEach(() => {
      store.$jwt.getToken.mockReturnValue(null);
    });

    it("then next isn't call", () => {
      isLoggedIn({next, store, nextMiddleware});
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("isn't authorized", () => {
    beforeEach(() => {
      store.$jwt.getToken.mockReturnValue(null);
    });

    it("then next isn't call", () => {
      isLoggedIn({next, store, nextMiddleware});
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("is authorized", () => {
    beforeEach(() => {
      store.$jwt.getToken.mockReturnValue("authorized");
    });

    it("then next call with /", () => {
      isLoggedIn({next, store, nextMiddleware});
      expect(next).toHaveBeenCalledWith("/");
    });
  });

});
