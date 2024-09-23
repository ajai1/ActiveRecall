import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { Dashboard } from "./components/Dashboard";
import { RootComponent } from "./components/RootComponent";
import { CreateNewDeck } from "./components/CreateFlashCard/CreateNewDeck";
import { CreateFlashCard } from "./components/CreateFlashCard/CreateFlashCard";
import { ShowDeckOfCards } from "./components/ShowDeckOfCards/ShowDeckOfCards";
import { ShowSelectedDeck } from "./components/ShowDeckOfCards/ShowSelectedDeck";
import { SignUp } from "./components/Login/SignUp";
import { SignIn } from "./components/Login/SignIn";
import { useContext } from "react";
import { UserContext } from "./contexts/user-context";
import { DeckEdit } from "./components/ShowDeckOfCards/DeckEdit";
import { ErrorPage } from "./components/ErrorPage";
import { AppContextProvider } from "./contexts/app-context";

const ProtectedRoute = ({ children }) => {
  const { userCreds } = useContext(UserContext);
  if (!userCreds) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      {
        path: "/create",
        element: (
          <ProtectedRoute>
            <CreateNewDeck />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create/:deckname",
        element: (
          <ProtectedRoute>
            <CreateFlashCard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deck-of-cards",
        element: (
          <ProtectedRoute>
            <ShowDeckOfCards />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deck-of-cards/:deckname",
        element: (
          <ProtectedRoute>
            <ShowSelectedDeck />
          </ProtectedRoute>
        ),
      },
      {
        path: "/deck-of-cards/edit/:deckname",
        element: (
          <ProtectedRoute>
            <DeckEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </AppContextProvider>
    </div>
  );
}

export default App;
