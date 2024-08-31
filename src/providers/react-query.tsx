// QueryProvider.js

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

// Cria uma instância do QueryClient com opções de configuração
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Opções padrão para todas as queries
      refetchOnWindowFocus: false, // Não refazer a consulta quando a janela ganha o foco
      retry: 1, // Número de tentativas em caso de erro
      staleTime: 1000 * 60 * 5, // Tempo antes de uma query ser considerada obsoleta (5 minutos)
    },
  },
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
