import { useSiteContent } from '@/context/SiteContentContext';
import LoginForm from '@/admin/LoginForm';
import Dashboard from '@/admin/Dashboard';

export default function AdminApp() {
  const { isAdmin } = useSiteContent();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {isAdmin ? <Dashboard /> : <LoginForm />}
    </div>
  );
}
