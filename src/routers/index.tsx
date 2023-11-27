import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "@/pages";
import DetailPage from "@/pages/detail-page";
import MyPokemon from "@/pages/my-pokemon";
import CatchPokemon from "@/pages/catch-pokemon";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail-pokemon/:name",
      element: <DetailPage />,
    },
    {
      path: "/catch-pokemon/:name",
      element: <CatchPokemon />,
    },
    {
      path: "/my-pokemon",
      element: <MyPokemon />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
