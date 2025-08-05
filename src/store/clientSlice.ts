import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface ClientState {
  builderList: Builder[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  builderList: [
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
  ],
  loading: false,
  error: null
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addClient: (state, action: PayloadAction<Omit<Builder, 'id'>>) => {
      const newClient = {
        ...action.payload,
        id: Date.now()
      };
      state.builderList.push(newClient);
    },
    updateClient: (state, action: PayloadAction<{ id: number; updates: Partial<Builder> }>) => {
      const { id, updates } = action.payload;
      const clientIndex = state.builderList.findIndex(client => client.id === id);
      if (clientIndex !== -1) {
        state.builderList[clientIndex] = { ...state.builderList[clientIndex], ...updates };
      }
    },
    removeClient: (state, action: PayloadAction<number>) => {
      state.builderList = state.builderList.filter(client => client.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { 
  addClient, 
  updateClient, 
  removeClient, 
  setLoading, 
  setError 
} = clientSlice.actions;

export default clientSlice.reducer; 