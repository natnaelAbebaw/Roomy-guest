import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "./style/globalStyles";
import { ReactQueryDevtools } from "react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import { Color } from "./ui/cssConstants";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import StripePayment from "./features/booking/StripePayment";
import PaymentSucess from "./features/booking/PaymentSucess";
import Bookings from "./pages/Bookings";
import AuthProvider from "./features/Authentication/AuthProvider";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./features/Authentication/ProtectedRoute";

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
          element: (
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          ),

          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/hotels/:hotelId",
              element: <HotelDetails />,
            },
            {
              path: "/payment/hotel/:hotelId/booking/:bookingId",
              element: <StripePayment />,
            },
            {
              path: "/paymentSucess",
              element: <PaymentSucess />,
            },
            {
              path: "/bookings",
              element: <Bookings />,
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
    </QueryClientProvider>
  );
}

export default App;
