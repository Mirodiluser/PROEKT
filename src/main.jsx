import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Tarjimalar from './pages/Tarjimalar';
import Fragmentlar from './pages/Fragmentlar';
import './index.css';  
import PdfViewer from './components/PdfViewer';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tarjimalar',
        element: <Tarjimalar />,
      },
      {
        path: '/fragmentlar',
        element: <Fragmentlar />,
      },
      {
        path: '/book/uzbek',
        element: <PdfViewer file="/books/uzbekcha.pdf" />,
      },
      {
        path: '/book/kazakh',
        element: <PdfViewer file="/books/qozoqcha.pdf" />,
      },
      {
        path: '/book/turkish',
        element: <PdfViewer file="/books/turkcha.pdf" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
