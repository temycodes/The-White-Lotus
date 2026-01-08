import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./ui/ProtectedRoute";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // time it takes for data from the api to become stale(0 seconds)
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/dashboard")}>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* index is the child that should load first, they have no path, replace swaps the history so the user cannot go back to the redirecting page*/}
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<CheckIn />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
              <Route path='account' element={<Account />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: "8px", zIndex: 999 }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "var(--color-brand-50)",
              color: "var(--color-brand-800)",
              border: "1px solid var(--color-brand-200)",
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "#fef2f2",
              color: "#7f1d1d",
              border: "1px solid #fecaca",
            },
          },
          style: {
            fontSize: "1.4rem",
            maxWidth: "48rem",
            padding: "1.6rem 2.4rem",
            borderRadius: "var(--border-radius-md)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(6px)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
