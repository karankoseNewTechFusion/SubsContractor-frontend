import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Builder {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  status: "Active" | "Inactive";
  estimatesSent?: number;
  activeJobs?: number;
  totalRevenue?: number;
}

interface ClientContextType {
  builderList: Builder[];
  addClient: (client: Builder) => void;
  updateClient: (id: number, updates: Partial<Builder>) => void;
  removeClient: (id: number) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [builderList, setBuilderList] = useState<Builder[]>([
    {
      id: 1,
      name: "John Smith",
      role: "General Contractor",
      avatar: "/avatars/john.jpg",
      rating: 4.8,
      status: "Active",
      estimatesSent: 12,
      activeJobs: 3,
      totalRevenue: 45000
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Plumber",
      avatar: "/avatars/sarah.jpg",
      rating: 4.6,
      status: "Active",
      estimatesSent: 8,
      activeJobs: 2,
      totalRevenue: 28000
    },
    {
      id: 3,
      name: "Mike Wilson",
      role: "Electrician",
      avatar: "/avatars/mike.jpg",
      rating: 4.9,
      status: "Inactive",
      estimatesSent: 15,
      activeJobs: 0,
      totalRevenue: 52000
    }
  ]);

  const addClient = (client: Builder) => {
    setBuilderList(prev => [...prev, { ...client, id: Date.now() }]);
  };

  const updateClient = (id: number, updates: Partial<Builder>) => {
    setBuilderList(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...updates } : client
      )
    );
  };

  const removeClient = (id: number) => {
    setBuilderList(prev => prev.filter(client => client.id !== id));
  };

  const value: ClientContextType = {
    builderList,
    addClient,
    updateClient,
    removeClient
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};

// Export for backward compatibility
export const BuilderListContext = ClientContext; 