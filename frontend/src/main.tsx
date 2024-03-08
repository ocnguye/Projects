//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { createTheme, ThemeProvider } from '@mui/material';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
  
const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const theme = createTheme({
    typography: {
      fontFamily: [
        'Syne Mono',
      ].join(','),
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
<ThemeProvider theme={theme}>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <RouterProvider router={router} />
        </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
</ThemeProvider>
)
