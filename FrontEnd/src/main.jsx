import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { LoginProvider } from './Login/LoginContext.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './HomePage.jsx'

import Education from './Education/Education.jsx'
import ErrorPage from '../ErrorPage.jsx'
import Protected from './Protected.jsx'
import Login from './Login/Login.jsx'
import Layout from './Layout.jsx'
import Profile from './Profile/Profile.jsx'
import Quiz from './Quiz/Quiz.jsx'
import Study from './Study.jsx'
import Flashcard from './Flashcard/Flashcard.jsx'
import Admin from './Administrator/Admin.jsx'
import EditUsers from './Administrator/EditUsers.jsx'
import EditQuestionere from './Administrator/EditQuestionere.jsx'
import EditFlashCards from './Administrator/EditFlashCards.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: <Protected> <HomePage /></Protected>,
        errorElement: <ErrorPage />,
      }, 

      {
        path: "/Education",
        element: <Protected><Education /></Protected>,
        errorElement: <ErrorPage />,
      },

      {
        path: "/Profile",
        element: <Protected><Profile/></Protected>,
        errorElement: <ErrorPage/>,
      },
      {
        path: "/Quiz",
        element: <Protected><Quiz /></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Study",
        element: <Protected><Study /></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Flashcard",
        element: <Protected><Flashcard/></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/Admin",
        element: <Protected><Admin /></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/EditUsers",
        element: <Protected><EditUsers /></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/EditQuestionere",
        element: <Protected><EditQuestionere /></Protected>,
        errorElement: <ErrorPage />,
      },
      {
        path: "/EditFlashcards",
        element: <Protected><EditFlashCards /></Protected>,
        errorElement: <ErrorPage />,
      },

    ],
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>,
 
)
