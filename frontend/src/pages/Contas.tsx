import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { format } from 'date-fns';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CreditCard, Building2, PiggyBank, Plus } from 'lucide-react';
import { mockAccounts, mockAccountBalanceData } from '../mockData';

type TimeFilter = '1W' | '1M' | '3M' | 'YTD' | '1Y' | 'ALL';

export const Contas = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1M');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const creditCards = mockAccounts.filter((acc) => acc.type === 'credit');
  const bankAccounts = mockAccounts.filter((acc) => acc.type !== 'credit');

  const totalAssets = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = creditCards.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contas</h1>
        <p className="text-gray-500 mt-1">Visão geral das suas contas e cartões</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Ativos</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalAssets)}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Dívidas</p>
          <p className="text-3xl font-bold text-red-600">{formatCurrency(totalDebt)}</p>
        </Card>
      </div>

      <Card title="Evolução do Saldo">
        <div className="flex gap-2 mb-6">
          {(['1W', '1M', '3M', 'YTD', '1Y', 'ALL'] as TimeFilter[]).map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockAccountBalanceData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Cartões de Crédito</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditCards.map((card) => (
            <Card key={card.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <CreditCard size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{card.name}</p>
                    <p className="text-xs text-gray-500">
                      Vencimento: {card.dueDate && format(card.dueDate, 'dd/MM/yyyy')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-600">Fatura atual</span>
                  <span className="text-xl font-bold text-red-600">
                    {formatCurrency(card.balance)}
                  </span>
                </div>
                {card.limit && (
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-gray-500">Limite disponível</span>
                    <span className="text-sm text-gray-700">
                      {formatCurrency(card.limit - card.balance)}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Contas Bancárias</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bankAccounts.map((account) => (
            <Card key={account.id}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    {account.type === 'savings' ? (
                      <PiggyBank size={20} className="text-green-600" />
                    ) : (
                      <Building2 size={20} className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{account.name}</p>
                    <p className="text-xs text-gray-500">
                      {account.type === 'savings' ? 'Poupança' : 'Conta Corrente'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-600">Saldo</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(account.balance)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Conectar conta</h3>
            <p className="text-sm text-gray-500">
              Conecte suas contas automaticamente via Open Finance
            </p>
          </div>
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            Adicionar
          </Button>
        </div>
      </Card>
    </div>
  );
};
