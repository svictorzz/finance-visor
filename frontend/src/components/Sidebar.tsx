import {
  LayoutDashboard,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
  PiggyBank,
  Repeat,
  FolderOpen,
  BarChart3,
  HelpCircle,
  CreditCard,
  Settings,
} from 'lucide-react';

export type PageType =
  | 'dashboard'
  | 'transacoes'
  | 'fluxo'
  | 'contas'
  | 'patrimonio'
  | 'recorrentes'
  | 'categorias'
  | 'relatorios';

interface SidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

interface MenuItem {
  id: PageType;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'transacoes', label: 'Transações', icon: <ArrowLeftRight size={20} /> },
  { id: 'fluxo', label: 'Fluxo de Caixa', icon: <TrendingUp size={20} /> },
  { id: 'contas', label: 'Contas', icon: <Wallet size={20} /> },
  { id: 'patrimonio', label: 'Patrimônio', icon: <PiggyBank size={20} /> },
  { id: 'recorrentes', label: 'Recorrentes', icon: <Repeat size={20} /> },
  { id: 'categorias', label: 'Categorias', icon: <FolderOpen size={20} /> },
  { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 size={20} /> },
];

export const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Visor</span>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                activePage === item.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
          <HelpCircle size={20} />
          <span className="text-sm">Suporte</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
          <CreditCard size={20} />
          <span className="text-sm">Plano</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-left">
          <Settings size={20} />
          <span className="text-sm">Configurações</span>
        </button>
      </div>
    </div>
  );
};
