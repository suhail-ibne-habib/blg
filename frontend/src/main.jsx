import { StrictMode } from 'react'
import './index.css'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { ClerkProvider } from '@clerk/clerk-react'

import Home from './routes/Home.jsx';
import Archive from './routes/Archive.jsx';
import SinglePost from './routes/SinglePost.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Write from './routes/Write.jsx';
import Layout from './layout/Layout.jsx';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Home />
          ),
        },
        {
          path: "posts",
          element: <Archive />,
        },
        {
          path: "posts/:slug", // /posts/behind-the-spotlight
          element: <SinglePost />,
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "write",
          element: <Write />
        }
      ]
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)


