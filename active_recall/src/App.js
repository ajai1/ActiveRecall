import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { Navbar } from "./components/Navbar";
import { RootComponent } from "./components/RootComponent";
import { CreateNewDeck } from "./components/CreateFlashCard/CreateNewDeck";
import { CreateFlashCard } from "./components/CreateFlashCard/CreateFlashCard";
import { ShowDeckOfCards } from "./components/ShowDeckOfCards/ShowDeckOfCards";
import { ShowSelectedDeck } from "./components/ShowDeckOfCards/ShowSelectedDeck";
import { SignUp } from "./components/Login/SignUp";
import { SignIn } from "./components/Login/SignIn";
import { UserProvider } from "./contexts/user-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/create", element: <CreateNewDeck /> },
      {
        path: "/create/:deck_id",
        element: <CreateFlashCard />,
      },
      {
        path: "/deck-of-cards",
        element: <ShowDeckOfCards />,
      },
      {
        path: "/deck-of-cards/:deck_id",
        element: <ShowSelectedDeck />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </UserProvider>
  );
}

export default App;
