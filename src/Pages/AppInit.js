import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import CreateNote from "./CreateNote";
import HomePage from "./HomePage";
import Login from "./Login";
const AppInit = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/Home",
      element: <HomePage />,
      children: [
        {
          path: "Note",
          element: <CreateNote />,
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
