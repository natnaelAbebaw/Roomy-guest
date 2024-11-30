import { useAuth } from "./AuthProvider";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, guest, setGuest, token, setToken } = useAuth();

  if (isAuthenticated && (!guest || !token)) {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
      const { token: accessToken, guest } = JSON.parse(token);
      setToken(accessToken);
      console.log("guest", guest);
      setGuest(guest);
    }
  }
  if (isAuthenticated && (!guest || !token)) {
    return null;
  }

  return children;
}

export default ProtectedRoute;
