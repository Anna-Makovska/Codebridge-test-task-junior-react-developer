import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from '../../pages/HomePage/HomePage';
import { ArticlePage } from '../../pages/ArticlePage/ArticlePage';
import { NotFound } from '../../pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#363636',
            borderRadius: '8px',
            padding: '16px',
            fontSize: '16px',
            border: '1px solid #e0e0e0',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#4caf50',
              secondary: '#fff',
            },
            style: {
              background: '#f5f5f5',
              color: '#363636',
            },
          },
          error: {
            iconTheme: {
              primary: '#f44336',
              secondary: '#fff',
            },
            style: {
              background: '#f5f5f5',
              color: '#363636',
            },
          },
        }}
      />
    </>
  );
}

export default App
