import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type TransactionType = 'deposit' | 'withdrawal';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  timestamp: number;
  status: 'success' | 'pending' | 'failed';
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getTransactions: () => Transaction[];
  clearTransactions: () => void;
}

// Generate some initial mock data
const generateMockData = (): Transaction[] => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  
  return [
    {
      id: '1',
      type: 'deposit',
      amount: '0.1',
      timestamp: now - (day * 30), // 30 days ago
      status: 'success',
    },
    {
      id: '2',
      type: 'deposit',
      amount: '0.2',
      timestamp: now - (day * 25), // 25 days ago
      status: 'success',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: '0.05',
      timestamp: now - (day * 20), // 20 days ago
      status: 'success',
    },
    {
      id: '4',
      type: 'deposit',
      amount: '0.15',
      timestamp: now - (day * 15), // 15 days ago
      status: 'success',
    },
    {
      id: '5',
      type: 'withdrawal',
      amount: '0.1',
      timestamp: now - (day * 10), // 10 days ago
      status: 'success',
    },
    {
      id: '6',
      type: 'deposit',
      amount: '0.3',
      timestamp: now - (day * 5), // 5 days ago
      status: 'success',
    },
  ];
};

type TransactionStorePersist = {
  name: string;
  partialize?: (state: TransactionState) => Partial<TransactionState>;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: generateMockData(),
      
      addTransaction: (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = {
          ...transaction,
          id: Math.random().toString(36).substring(2, 9),
        };
        
        set((state: TransactionState) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },
      
      getTransactions: () => {
        return get().transactions;
      },
      
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: 'transaction-storage',
    } as TransactionStorePersist
  )
); 