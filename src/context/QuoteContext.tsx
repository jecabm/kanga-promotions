import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

interface QuoteContextValue {
  selected: string[];
  setSelected: (ids: string[]) => void;
  /** add a product to the quote selection (used by "Enquire now" links) */
  preselect: (id: string) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const preselect = useCallback((id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);
  return <QuoteContext.Provider value={{ selected, setSelected, preselect }}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used inside <QuoteProvider>');
  return ctx;
}
