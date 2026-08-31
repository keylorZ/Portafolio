import { createContext, useContext, type ReactNode } from 'react';
import { defaultContent } from '@/data/profile';
import type { SiteContent } from '@/types/content';

interface SiteContentContextValue {
  content: SiteContent;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  return <SiteContentContext.Provider value={{ content: defaultContent }}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent debe usarse dentro de <SiteContentProvider>');
  }
  return ctx;
}
