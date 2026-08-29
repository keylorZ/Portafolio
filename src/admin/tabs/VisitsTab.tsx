import { useCallback, useEffect, useState } from 'react';
import {
  BarChart3,
  CalendarDays,
  Eye,
  RefreshCw,
  Users,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { SectionHeading } from '@/admin/ui';
import { authFetch } from '@/lib/adminApi';

interface SeriePoint {
  fecha: string;
  total: number;
}

interface VisitaReciente {
  id: number;
  fecha: string;
  ip: string | null;
  userAgent: string | null;
}

interface VisitasData {
  total: number;
  hoy: number;
  visitantes: number;
  serie: SeriePoint[];
  recientes: VisitaReciente[];
}

export default function VisitsTab() {
  const [data, setData] = useState<VisitasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/visitas/detalle');
      if (!res.ok) throw new Error('No se pudieron cargar las visitas');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las visitas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const max = data ? Math.max(1, ...data.serie.map((p) => p.total)) : 1;

  const stats = [
    { label: 'Visitas totales', value: data?.total ?? 0, icon: Eye },
    { label: 'Visitas hoy', value: data?.hoy ?? 0, icon: CalendarDays },
    { label: 'Visitantes únicos', value: data?.visitantes ?? 0, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <SectionHeading
          title="Visitas"
          description="Datos recolectados por cada persona que visita tu sitio."
        />
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-teal-400/50 hover:text-teal-300 disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading && !data ? (
        <div className="flex items-center justify-center py-16 text-slate-500">
          <Loader2 size={22} className="animate-spin mr-2" /> Cargando visitas...
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {value.toLocaleString('es-CR')}
                  </p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 size={16} className="text-teal-400" />
              <h4 className="text-sm font-semibold text-slate-200">Últimos 14 días</h4>
            </div>
            {data && data.serie.length > 0 ? (
              <div className="flex items-end gap-1.5 sm:gap-2 h-40">
                {data.serie.map((p) => (
                  <div
                    key={p.fecha}
                    className="flex-1 flex flex-col items-center gap-1 group"
                    title={`${p.fecha}: ${p.total} visita(s)`}
                  >
                    <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.total}
                    </span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-teal-600/70 to-teal-400 transition-all duration-200 group-hover:from-teal-500 group-hover:to-teal-300"
                      style={{
                        height: `${Math.max(3, Math.round((p.total / max) * 100))}%`,
                      }}
                    />
                    <span className="text-[10px] text-slate-500">{p.fecha.slice(5)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Sin visitas registradas en este período.</p>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-3">Visitas recientes</h4>
            {data && data.recientes.length > 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-left text-xs text-slate-500">
                      <th className="px-4 py-3 font-medium">Fecha</th>
                      <th className="px-4 py-3 font-medium">IP</th>
                      <th className="px-4 py-3 font-medium">Navegador / dispositivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recientes.map((v) => (
                      <tr key={v.id} className="border-b border-slate-800/50 last:border-0">
                        <td className="px-4 py-2.5 text-slate-300 whitespace-nowrap">{v.fecha}</td>
                        <td className="px-4 py-2.5 text-slate-400">
                          {v.ip ?? <span className="text-slate-600">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-slate-400 max-w-xs truncate">
                          {v.userAgent ?? <span className="text-slate-600">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Aún no hay visitas registradas.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}