export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

export interface Category {
  name: string;
  color: string;
}
