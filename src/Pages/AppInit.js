import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import CreateNote from "./CreateNote";
import HomePage from "./HomePage";
import Login from "./Login";

import MyNotesPage from "./MyNotesPage";
const AppInit = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <HomePage />,
      children: [
        {
          path: "note",
          element: <CreateNote />,
        },
        {
          path: "mynotes",
          element: <MyNotesPage />,
        },
        {
          path: "favourites",
          element: <MyNotesPage />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default AppInit;
