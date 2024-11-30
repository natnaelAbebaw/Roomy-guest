import { createContext, useContext, useState } from "react";
import { Guest } from "../../services/AuthApi";
import { useLogin } from "./useLogin";
import { Outlet, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import toast from "react-hot-toast";

const AuthContext = createContext<{
  guest: Guest | null;

  login: (credentials: { email: string; password: string }) => void;
  token: string | null;
  isLoginLoading: boolean;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setGuest: (guest: Guest | null) => void;
  // hotel: Hotel | null;
  // setHotel: (hotel: Hotel | null) => void;
  logout: () => void;
  isSignupLoading: boolean;
  signup: (credentials: {
    email: string;
    password: string;
    userName: string;
  }) => void;
}>({
  guest: null,
  login: () => {},
  token: null,
  isLoginLoading: false,
  isAuthenticated: false,
  setToken: () => {},
  setGuest: () => {},
  signup: () => {},
  // hotel: null,
  // setHotel: () => {},
  logout: () => {},
  isSignupLoading: false,
});

function AuthProvider() {
  const [guest, setGuest] = useState<Guest | null>(null);

  // const [hotel, setHotel] = useState<Hotel | null>(null);

  const [token, setToken] = useState<string | null>(null);

  // const [darkMode, setDarkMode] = useState<boolean>(false);

  const navigate = useNavigate();

  const { Login, isLoginLoading } = useLogin();

  const { Signup, isSignupLoading } = useSignup();

  async function login(credentials: { email: string; password: string }) {
    Login(credentials, {
      onSuccess: (data) => {
        setGuest(data.guest);
        setToken(data.token);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({
            token: data.token,
            guest: data.guest,
          })
        );
        navigate("/");
      },
    });
  }

  async function signup(credentials: {
    email: string;
    password: string;
    userName: string;
  }) {
    Signup(credentials, {
      onSuccess: (data) => {
        setGuest(data.guest);
        setToken(data.token);
        localStorage.setItem(
          "accessToken",
          JSON.stringify({
            token: data.token,
            guest: data.guest,
          })
        );
        navigate("/");
      },
    });
  }

  function logout() {
    localStorage.removeItem("accessToken");
    navigate("/");
    toast.success("Logout successfully");
  }

  // function toogleDarkMode() {
  //   setDarkMode(!darkMode);
  //   document.documentElement.classList.toggle("dark-mode");
  // }

  return (
    <AuthContext.Provider
      value={{
        token,
        guest,
        login,
        isLoginLoading,
        setToken,
        setGuest,
        isAuthenticated: localStorage.getItem("accessToken") !== null,
        signup,
        logout,
        isSignupLoading,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
