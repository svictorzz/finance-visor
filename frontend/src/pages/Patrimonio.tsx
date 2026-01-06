import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import {
  mockPatrimonioAssets,
  mockPatrimonioHistoryData,
  patrimonio,
  patrimonioGrowth,
} from '../mockData';

export const Patrimonio = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const assetClasses = mockPatrimonioAssets.reduce((acc, asset) => {
    if (!acc[asset.class]) {
      acc[asset.class] = { total: 0, percentage: 0, color: '' };
    }
    acc[asset.class].total += asset.value;
    acc[asset.class].percentage += asset.percentage;
    return acc;
  }, {} as Record<string, { total: number; percentage: number; color: string }>);

  assetClasses['Caixa'].color = '#3B82F6';
  assetClasses['Renda Fixa'].color = '#10B981';
  assetClasses['Renda Variável'].color = '#8B5CF6';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Patrimônio</h1>
        <p className="text-gray-500 mt-1">Acompanhe a evolução do seu patrimônio</p>
      </div>

      <Card>
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">Patrimônio Líquido</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-gray-900">{formatCurrency(patrimonio)}</p>
            <div className="flex items-center gap-1 text-green-600 mb-1">
              <TrendingUp size={20} />
              <span className="text-lg font-semibold">{patrimonioGrowth}%</span>
              <span className="text-sm text-gray-500 ml-1">este mês</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockPatrimonioHistoryData}>
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
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Alocação de Ativos">
        <div className="space-y-6">
          <div className="flex gap-2 h-4 rounded-full overflow-hidden">
            {Object.entries(assetClasses).map(([className, data]) => (
              <div
                key={className}
                style={{
                  width: `${data.percentage}%`,
                  backgroundColor: data.color,
                }}
                className="transition-all duration-300"
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {Object.entries(assetClasses).map(([className, data]) => (
              <div key={className} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: data.color }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{className}</p>
                  <p className="text-xs text-gray-500">{data.percentage.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            {Object.entries(assetClasses).map(([className, classData]) => {
              const assetsInClass = mockPatrimonioAssets.filter((a) => a.class === className);
              return (
                <div key={className} className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-sm">{className}</h4>
                  {assetsInClass.map((asset) => (
                    <div key={asset.id} className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 mb-2">{asset.name}</p>
                        <div className="flex items-center gap-3">
                          <ProgressBar
                            value={asset.percentage}
                            max={100}
                            color={classData.color}
                            className="flex-1"
                          />
                          <span className="text-xs text-gray-500 w-12">
                            {asset.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right min-w-[120px]">
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(asset.value)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};
