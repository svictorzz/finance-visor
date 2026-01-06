import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import {
  mockUser,
  mockCategories,
  mockSpendingRhythmData,
  patrimonio,
  patrimonioGrowth,
  totalIncome,
  totalExpenses,
} from '../mockData';

export const Dashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const resultPercentage = (totalExpenses / totalIncome) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo de volta, {mockUser.name}
        </h1>
        <p className="text-gray-500 mt-1">
          Aqui está um resumo das suas finanças de hoje
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Ritmo de Gastos" className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="success">
              <TrendingDown size={12} className="mr-1" />
              Abaixo da média
            </Badge>
            <span className="text-sm text-gray-500">vs. mês passado</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={mockSpendingRhythmData}>
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
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={false}
                name="Mês Passado"
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                name="Mês Atual"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="space-y-6">
          <Card title="Patrimônio">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(patrimonio)}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-green-600 flex items-center font-medium">
                  <TrendingUp size={16} className="mr-1" />
                  {patrimonioGrowth}%
                </span>
                <span className="text-gray-500">este mês</span>
              </div>
            </div>
          </Card>

          <Card title="Resultado Parcial">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Receita</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-600">Gasto</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(totalExpenses)}
                  </span>
                </div>
                <ProgressBar value={totalExpenses} max={totalIncome} height="h-3" />
                <p className="text-xs text-gray-500 mt-2">
                  Você gastou {resultPercentage.toFixed(0)}% da sua receita
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Principais Categorias">
        <div className="space-y-4">
          {mockCategories.map((category) => {
            const IconComponent = (LucideIcons as any)[category.icon];
            const percentSpent = (category.spent / category.budget) * 100;
            const change = category.spent - category.previousMonth;
            const changePercent = ((change / category.previousMonth) * 100).toFixed(1);

            return (
              <div key={category.id} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {IconComponent && (
                    <IconComponent size={20} style={{ color: category.color }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(category.spent)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      value={category.spent}
                      max={category.budget}
                      color={category.color}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500 w-16 text-right">
                      {percentSpent.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      de {formatCurrency(category.budget)}
                    </span>
                    <span
                      className={`text-xs flex items-center ${
                        change > 0 ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {change > 0 ? (
                        <TrendingUp size={12} className="mr-0.5" />
                      ) : (
                        <TrendingDown size={12} className="mr-0.5" />
                      )}
                      {Math.abs(parseFloat(changePercent))}% vs mês anterior
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
