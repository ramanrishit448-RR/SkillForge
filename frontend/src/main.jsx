import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import store from './redux/store.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const isClerkConfigured = Boolean(
  PUBLISHABLE_KEY &&
  PUBLISHABLE_KEY.startsWith("pk_") &&
  !PUBLISHABLE_KEY.includes("xxxxxxxx")
);

const AppTree = (
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App isClerkConfigured={isClerkConfigured} />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);

createRoot(document.getElementById('root')).render(
  isClerkConfigured ? (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {AppTree}
    </ClerkProvider>
  ) : (
    AppTree
  )
);
