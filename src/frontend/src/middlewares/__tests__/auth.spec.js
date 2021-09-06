import { auth } from "@/middlewares";

describe('auth', () => {
  const next = jest.fn();

  const nextMiddleware = jest.fn();

  const store = {
    state: {
      Auth: {
        isAuthenticated: true,
      }
    },
    dispatch: jest.fn(),
    $jwt: {
      getToken: jest.fn(),
    }
  }

  describe('when not authenticated', () => {
    beforeEach(() => {
      store.state.Auth.isAuthenticated = false;
    })

    describe('if jwt token exists', () => {
      beforeEach(() => {
        store.$jwt.getToken.mockReturnValue("token");
      })

      it('should dispatch fetchUsers', () => {
        auth({next, store, nextMiddleware});

        expect(store.dispatch).toHaveBeenCalledWith('Auth/fetchUsers')
      });

      it('should run next middleware', () => {
        auth({next, store, nextMiddleware});
        expect(nextMiddleware).toHaveBeenCalledWith()
      });
    });

    describe('if jwt token not exists', () => {
      beforeEach(() => {
        store.$jwt.getToken.mockReturnValue(null);
      })

      it('should redirect to route', () => {
        auth({next, store, nextMiddleware});
        expect(next).toHaveBeenCalledWith('/')
      });
    });
  });
});
