import { useState } from 'react';
import { Card } from '../components/Card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import * as LucideIcons from 'lucide-react';
import { Check } from 'lucide-react';
import {
  mockRecurringExpenses,
  mockRecurringIncome,
  recurringExpensesTotal,
  recurringExpensesPaid,
} from '../mockData';

type TabType = 'expenses' | 'income';

export const Recorrentes = () => {
  const [activeTab, setActiveTab] = useState<TabType>('expenses');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const data = activeTab === 'expenses' ? mockRecurringExpenses : mockRecurringIncome;
  const groupedByDate = data.reduce((acc, item) => {
    const dateKey = format(item.dueDate, 'EEE, MMM d', { locale: ptBR });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, typeof data>);

  const unpaid = recurringExpensesTotal - recurringExpensesPaid;
  const pieData = [
    { name: 'Pago', value: recurringExpensesPaid },
    { name: 'A Pagar', value: unpaid },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recorrentes</h1>
        <p className="text-gray-500 mt-1">Gerencie suas assinaturas e pagamentos fixos</p>
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'expenses'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Despesas
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'income'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Receitas
        </button>
      </div>

      {activeTab === 'expenses' && (
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Falta pagar este mês</p>
              <p className="text-3xl font-bold text-red-600 mb-4">
                {formatCurrency(unpaid)}
              </p>
              <p className="text-sm text-gray-600 mb-1">Pago até agora</p>
              <p className="text-2xl font-semibold text-green-600">
                {formatCurrency(recurringExpensesPaid)}
              </p>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#EF4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        {Object.entries(groupedByDate).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              {date}
            </h3>
            <Card className="space-y-3">
              {items.map((item) => {
                const IconComponent = (LucideIcons as any)[item.icon];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        {IconComponent && (
                          <IconComponent size={24} style={{ color: item.color }} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {format(item.dueDate, 'dd/MM/yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p
                        className={`text-lg font-semibold ${
                          item.type === 'expense' ? 'text-red-600' : 'text-green-600'
                        }`}
                      >
                        {item.type === 'expense' ? '-' : '+'} {formatCurrency(item.amount)}
                      </p>
                      {item.isPaid && (
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check size={14} className="text-green-600" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
