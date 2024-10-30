import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/website/Home";
import GlobalStyle from "./style/globalStyles";
import { ReactQueryDevtools } from "react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import HotelDetails from "./pages/website/HotelDetails";
import AppDashBoardLayout from "./ui/Dashboard/AppDashBoardLayout";
import { Toaster } from "react-hot-toast";
import { Color } from "./ui/cssConstants";
import Dashboard from "./pages/dashboard/Dashboard";
import Room from "./pages/dashboard/Room";
import Booking from "./pages/dashboard/Booking";
import LoginForm from "./features/Dashboard/Authentication/LoginForm";
import AuthProvider from "./features/Dashboard/Authentication/AuthProvider";
import ProtectedRoute from "./features/Dashboard/Authentication/ProtectedRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <AuthProvider />,
      children: [
        {
          element: <LoginForm />,
          path: "login",
        },
        {
          element: <AppLayout />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/hotels/:hotelId",
              element: <HotelDetails />,
            },
          ],
        },
        {
          element: (
            <ProtectedRoute>
              <AppDashBoardLayout />
            </ProtectedRoute>
          ),
          path: "dashboard",
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "rooms",
              element: <Room />,
            },
            {
              path: "bookings",
              element: <Booking />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2000,
          style: {
            background: Color.grey0,
            color: Color.grey700,
          },

          success: {
            duration: 2000,
          },
        }}
      />
      ;
    </QueryClientProvider>
  );
}

export default App;
