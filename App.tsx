
import React, { useState } from 'react';
import WaterCalculator from './components/WaterCalculator';
import KidneyCalculator from './components/KidneyCalculator';
import { DropletIcon, KidneyIcon } from './components/Icons';

type Tab = 'water' | 'kidney';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('water');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'water':
        return <WaterCalculator />;
      case 'kidney':
        return <KidneyCalculator />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{
    tabName: Tab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 p-3 text-sm sm:text-base font-semibold rounded-t-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-400 ${
        activeTab === tabName
          ? 'bg-white dark:bg-slate-800 text-cyan-500'
          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800/70 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Health Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Your Personal Wellness Calculator</p>
        </header>

        <main>
          <div className="bg-slate-900/70 backdrop-blur-sm rounded-t-lg p-1.5 flex gap-1.5">
            <TabButton tabName="water" label="Water Needs" icon={<DropletIcon className="w-5 h-5" />} />
            <TabButton tabName="kidney" label="Kidney Health" icon={<KidneyIcon className="w-5 h-5" />} />
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-b-lg shadow-2xl shadow-slate-900/20">
            {renderTabContent()}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} Health Hub. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
