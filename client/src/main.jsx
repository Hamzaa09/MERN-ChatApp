import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Home from './components/home/Homepage';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import ProtectedRoute from './frontendUtillities/protectedRoutes.jsx';
import LandingPage from './components/landing/LandingPage.jsx';
import ProfileUpdate from './components/home/ProfileUpdate.jsx';
import ChatsLoader from './components/loaders/ChatsLoader.jsx';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <LandingPage />
    }
    ,
    {
      path: "/profileupdate",
      element:
        <ProfileUpdate />
    }
    ,
    {
      path: "/chats",
      element:
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>,
    }
    , {
      path: "/login",
      element: <Login />,
    }
    , {
      path: "/signup",
      element: <Signup />,
    }
  ],
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <RouterProvider router={router} />
  </Provider>

)