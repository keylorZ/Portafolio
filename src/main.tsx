import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminApp from '@/admin/AdminApp';
import { SiteContentProvider } from '@/context/SiteContentContext';
import './index.css';

const ADMIN_PATH = '/key05adminadmin';

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
const isAdminRoute = currentPath === ADMIN_PATH;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteContentProvider>{isAdminRoute ? <AdminApp /> : <App />}</SiteContentProvider>
  </StrictMode>
);
