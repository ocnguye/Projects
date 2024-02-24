import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App'
import Login from './Login'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  
const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/*<App /> */}
      <Login />
    </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
