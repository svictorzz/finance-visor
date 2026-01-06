import { useState } from 'react';
import { Sidebar, PageType } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Recorrentes } from './pages/Recorrentes';
import { Contas } from './pages/Contas';
import { Patrimonio } from './pages/Patrimonio';
import { Placeholder } from './pages/Placeholder';

function App() {
  const [activePage, setActivePage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'recorrentes':
        return <Recorrentes />;
      case 'contas':
        return <Contas />;
      case 'patrimonio':
        return <Patrimonio />;
      case 'transacoes':
        return (
          <Placeholder
            title="Transações"
            description="Visualize e gerencie todas as suas transações"
          />
        );
      case 'fluxo':
        return (
          <Placeholder
            title="Fluxo de Caixa"
            description="Acompanhe as entradas e saídas do seu dinheiro"
          />
        );
      case 'categorias':
        return (
          <Placeholder title="Categorias" description="Organize suas despesas por categoria" />
        );
      case 'relatorios':
        return (
          <Placeholder title="Relatórios" description="Análises detalhadas das suas finanças" />
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 ml-64 p-8">{renderPage()}</main>
    </div>
  );
}

export default App;
