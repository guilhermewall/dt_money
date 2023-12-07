import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../lib/axios";

interface Transactions {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => void;
  createTransaction: (data: CreateTransactionInput) => void;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionProvider = ({ children }: TransactionProviderProps) => {
  const [transactions, setTransactions] = useState<Transactions[]>([]);

  const fetchTransactions = (query?: string) => {
    api
      .get("/transactions", {
        params: {
          _sort: "createdAt",
          _order: "desc",
          q: query,
        },
      })
      .then((response) => setTransactions(response.data))
      .catch((e) => console.log(e));
  };

  const createTransaction = (data: CreateTransactionInput) => {
    api
      .post("/transactions", {
        category: data.category,
        description: data.description,
        price: data.price,
        type: data.type,
        createdAt: new Date(),
      })
      .then((response) => {
        setTransactions((state) => [response.data, ...state]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
