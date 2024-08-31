'use client'
import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';

// Define el tipo para las claves de API
type ApiKeys = {
  gemini_key: string | null;
  // Añade aquí otras claves de API que puedas necesitar
};

// Define el tipo para el contexto
type ApiKeysContextType = {
  apiKeys: ApiKeys;
  user_id: string;
  updateApiKeys: (newKeys: Partial<ApiKeys>) => void;
  setUserId: (id: string) => void;
};

const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined);

// Props para el proveedor del contexto
type ApiKeysProviderProps = {
  children: ReactNode;
  initialApiKeys?: Partial<ApiKeys>;
  initialUserId?: string;
};

// Proveedor del contexto
export const ApiKeysProvider: React.FC<ApiKeysProviderProps> = ({ 
  children, 
  initialApiKeys = {},
  initialUserId = ''
}) => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    gemini_key: null,
    ...initialApiKeys
  });
  const [user_id, setUserId] = useState<string>(initialUserId || '');

  const updateApiKeys = useCallback((newKeys: Partial<ApiKeys>) => {
    setApiKeys(prevKeys => ({ ...prevKeys, ...newKeys }));
  }, []);

  const contextValue = React.useMemo(() => ({
    apiKeys,
    user_id,
    updateApiKeys,
    setUserId
  }), [apiKeys, user_id, updateApiKeys]);

  return (
    <ApiKeysContext.Provider value={contextValue}>
      {children}
    </ApiKeysContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useApiKeys = (): ApiKeysContextType => {
  const context = useContext(ApiKeysContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeysProvider');
  }
  return context;
};

// Hook personalizado para obtener una clave específica
export const useApiKey = (keyName: keyof ApiKeys): string | null => {
  const { apiKeys } = useApiKeys();
  return apiKeys[keyName];
};