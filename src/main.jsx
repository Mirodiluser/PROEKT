import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chat",
        element: <Chat />,
      }   
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
