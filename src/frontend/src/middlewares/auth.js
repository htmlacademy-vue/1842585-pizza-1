export default function auth({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      store.dispatch("Auth/fetchUsers");
    } else {
      next("/");
    }
  }
  return nextMiddleware();
}
