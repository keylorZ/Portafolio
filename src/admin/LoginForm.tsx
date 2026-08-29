import { FormEvent, useState } from 'react';
import { Lock, User, KeyRound, ArrowLeft, AlertCircle } from 'lucide-react';
import { useSiteContent } from '@/context/SiteContentContext';

export default function LoginForm() {
  const { login, error } = useSiteContent();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (!ok) setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-sm">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-300 transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Volver al sitio
        </a>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 mb-5">
            <Lock size={22} />
          </div>
          <h1 className="font-display text-2xl font-bold text-white mb-1">Panel de administración</h1>
          <p className="text-sm text-slate-500 mb-6">Inicia sesión para editar el contenido del sitio.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-medium text-slate-400 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="username"
                  type="text"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60"
                  placeholder="Usuario"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-400 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-slate-950 border border-slate-700 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-teal-400/60"
                  placeholder="Contraseña"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-400/20 rounded-lg px-4 py-3">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-teal-400 active:scale-[0.98]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
