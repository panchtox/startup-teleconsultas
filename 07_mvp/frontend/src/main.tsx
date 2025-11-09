import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './contexts/SidebarContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
