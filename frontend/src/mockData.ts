export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  isRecurring: boolean;
}

export interface RecurringItem {
  id: string;
  name: string;
  amount: number;
  dueDate: Date;
  isPaid: boolean;
  type: 'expense' | 'income';
  icon: string;
  color: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'credit' | 'checking' | 'savings';
  balance: number;
  dueDate?: Date;
  limit?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  budget: number;
  spent: number;
  previousMonth: number;
  color: string;
}

export interface PatrimonioAsset {
  id: string;
  name: string;
  class: string;
  value: number;
  percentage: number;
}

export interface ChartDataPoint {
  date: string;
  current: number;
  previous?: number;
  value?: number;
}

export const mockUser = {
  name: 'Victor',
  email: 'victor@gmail.com',
};

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Moradia',
    icon: 'Home',
    budget: 2500,
    spent: 2200,
    previousMonth: 2100,
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Supermercado',
    icon: 'ShoppingCart',
    budget: 1200,
    spent: 980,
    previousMonth: 1050,
    color: '#10B981',
  },
  {
    id: '3',
    name: 'Transporte',
    icon: 'Car',
    budget: 800,
    spent: 650,
    previousMonth: 720,
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'Alimentação',
    icon: 'UtensilsCrossed',
    budget: 900,
    spent: 720,
    previousMonth: 680,
    color: '#EF4444',
  },
  {
    id: '5',
    name: 'Lazer',
    icon: 'Gamepad2',
    budget: 600,
    spent: 450,
    previousMonth: 520,
    color: '#8B5CF6',
  },
  {
    id: '6',
    name: 'Saúde',
    icon: 'Heart',
    budget: 500,
    spent: 380,
    previousMonth: 420,
    color: '#EC4899',
  },
];

export const mockRecurringExpenses: RecurringItem[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 55.9,
    dueDate: new Date(2026, 0, 7),
    isPaid: false,
    type: 'expense',
    icon: 'Film',
    color: '#E50914',
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 21.9,
    dueDate: new Date(2026, 0, 7),
    isPaid: false,
    type: 'expense',
    icon: 'Music',
    color: '#1DB954',
  },
  {
    id: '3',
    name: 'iCloud',
    amount: 12.9,
    dueDate: new Date(2026, 0, 7),
    isPaid: false,
    type: 'expense',
    icon: 'Cloud',
    color: '#147EFB',
  },
  {
    id: '4',
    name: 'Amazon Prime',
    amount: 19.9,
    dueDate: new Date(2026, 0, 15),
    isPaid: true,
    type: 'expense',
    icon: 'Package',
    color: '#FF9900',
  },
  {
    id: '5',
    name: 'Academia',
    amount: 149.9,
    dueDate: new Date(2026, 0, 15),
    isPaid: false,
    type: 'expense',
    icon: 'Dumbbell',
    color: '#6366F1',
  },
  {
    id: '6',
    name: 'Internet',
    amount: 99.9,
    dueDate: new Date(2026, 0, 20),
    isPaid: true,
    type: 'expense',
    icon: 'Wifi',
    color: '#0EA5E9',
  },
  {
    id: '7',
    name: 'Aluguel',
    amount: 1800.0,
    dueDate: new Date(2026, 0, 5),
    isPaid: true,
    type: 'expense',
    icon: 'Home',
    color: '#3B82F6',
  },
];

export const mockRecurringIncome: RecurringItem[] = [
  {
    id: '1',
    name: 'Salário',
    amount: 8500.0,
    dueDate: new Date(2026, 0, 5),
    isPaid: true,
    type: 'income',
    icon: 'Briefcase',
    color: '#10B981',
  },
  {
    id: '2',
    name: 'Freelance',
    amount: 2000.0,
    dueDate: new Date(2026, 0, 15),
    isPaid: false,
    type: 'income',
    icon: 'Laptop',
    color: '#8B5CF6',
  },
];

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Nubank',
    type: 'credit',
    balance: 1250.0,
    dueDate: new Date(2026, 0, 15),
    limit: 5000,
  },
  {
    id: '2',
    name: 'Inter',
    type: 'credit',
    balance: 890.0,
    dueDate: new Date(2026, 0, 20),
    limit: 3000,
  },
  {
    id: '3',
    name: 'Itaú',
    type: 'checking',
    balance: 3250.8,
  },
  {
    id: '4',
    name: 'Nubank',
    type: 'checking',
    balance: 5680.5,
  },
  {
    id: '5',
    name: 'Poupança',
    type: 'savings',
    balance: 12000.0,
  },
];

export const mockPatrimonioAssets: PatrimonioAsset[] = [
  {
    id: '1',
    name: 'Conta Corrente Itaú',
    class: 'Caixa',
    value: 3250.8,
    percentage: 6.5,
  },
  {
    id: '2',
    name: 'Conta Corrente Nubank',
    class: 'Caixa',
    value: 5680.5,
    percentage: 11.4,
  },
  {
    id: '3',
    name: 'Poupança',
    class: 'Caixa',
    value: 12000.0,
    percentage: 24.1,
  },
  {
    id: '4',
    name: 'Tesouro IPCA+',
    class: 'Renda Fixa',
    value: 18500.0,
    percentage: 37.1,
  },
  {
    id: '5',
    name: 'CDB Banco Inter',
    class: 'Renda Fixa',
    value: 5200.0,
    percentage: 10.4,
  },
  {
    id: '6',
    name: 'Ações ITUB4',
    class: 'Renda Variável',
    value: 3100.0,
    percentage: 6.2,
  },
  {
    id: '7',
    name: 'FII HGLG11',
    class: 'Renda Variável',
    value: 2150.0,
    percentage: 4.3,
  },
];

export const mockSpendingRhythmData: ChartDataPoint[] = [
  { date: '01', current: 0, previous: 0 },
  { date: '02', current: 120, previous: 150 },
  { date: '03', current: 280, previous: 320 },
  { date: '04', current: 450, previous: 520 },
  { date: '05', current: 2350, previous: 2420 },
  { date: '06', current: 2580, previous: 2680 },
  { date: '07', current: 2720, previous: 2850 },
  { date: '08', current: 2890, previous: 3100 },
  { date: '09', current: 3120, previous: 3380 },
  { date: '10', current: 3380, previous: 3620 },
  { date: '11', current: 3620, previous: 3890 },
  { date: '12', current: 3850, previous: 4150 },
  { date: '13', current: 4100, previous: 4420 },
  { date: '14', current: 4320, previous: 4680 },
  { date: '15', current: 4580, previous: 4950 },
];

export const mockAccountBalanceData: ChartDataPoint[] = [
  { date: '07 Dez', value: 18200 },
  { date: '14 Dez', value: 17800 },
  { date: '21 Dez', value: 19100 },
  { date: '28 Dez', value: 20300 },
  { date: '04 Jan', value: 27800 },
  { date: '11 Jan', value: 26900 },
  { date: '18 Jan', value: 27200 },
  { date: '25 Jan', value: 26500 },
  { date: '01 Fev', value: 28100 },
];

export const mockPatrimonioHistoryData: ChartDataPoint[] = [
  { date: 'Set', value: 42800 },
  { date: 'Out', value: 44200 },
  { date: 'Nov', value: 46500 },
  { date: 'Dez', value: 48100 },
  { date: 'Jan', value: 49880 },
];

export const totalIncome = 10500.0;
export const totalExpenses = 5380.0;
export const patrimonio = 4978800.5;
export const patrimonioGrowth = 3.8;
export const recurringExpensesTotal = 2160.3;
export const recurringExpensesPaid = 1899.8;
