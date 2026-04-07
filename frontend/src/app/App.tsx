import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { Loader } from "./components/Loader";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}