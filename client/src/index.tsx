import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';
import { router } from './routes';
import './styles/index.css';

const queryClient = new QueryClient();
const container = document.getElementById('root')!;
createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider> 
        <RouterProvider router={router} />
      </UserProvider> 
    </QueryClientProvider>
  </React.StrictMode>
);
