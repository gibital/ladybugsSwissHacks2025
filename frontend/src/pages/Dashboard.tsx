import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';
import { Wallet, ArrowUpRight, ArrowDownRight, BarChart3, DollarSign, History, ChevronDown } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectionChange = (connected: boolean) => {
    setIsConnected(connected);
  };

  // Mock data - replace with real data from your API
  const balances = {
    rlusd: 2547.89,
    xrp: 1250.45,
    rlusdValue: 2547.89, // 1:1 with USD
    xrpValue: 1625.59, // Mock XRP price at $1.30
  };

  const recentTransactions = [
    { id: 1, type: 'received', amount: 500, currency: 'RLUSD', date: '2024-03-10', from: '0x1234...5678' },
    { id: 2, type: 'sent', amount: 100, currency: 'XRP', date: '2024-03-09', to: '0x8765...4321' },
    { id: 3, type: 'received', amount: 250, currency: 'XRP', date: '2024-03-08', from: '0x9876...5432' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wallet className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">GAIA</h1>
            </div>
            <nav className="flex space-x-8 items-center">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`${
                  activeTab === 'transactions'
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                Transactions
              </button>
              
              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  Services
                  <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isServicesOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isServicesOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={() => navigate('/loan')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                      >
                        Request a Loan
                      </button>
                      <button
                        onClick={() => navigate('/credit-score')}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        role="menuitem"
                      >
                        Credit Score
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
              >
                <WalletConnect onConnectionChange={handleConnectionChange} />
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* RLUSD Balance Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F343%2F897%2Fpng-clipart-ripple-cryptocurrency-ethereum-coin-eye-catching-ripples-blue-logo.png" alt="XRP Logo" className="h-8 w-8" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">RLUSD Balance</h2>
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">${balances.rlusd.toLocaleString()}</p>
              <p className="ml-2 text-sm text-gray-500">RLUSD</p>
            </div>
            <div className="mt-4 flex space-x-3">
              <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-200">
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Receive
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </div>

          {/* XRP Balance Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cryptovantage.com%2Fapp%2Fuploads%2F2020%2F03%2Fxrp-xrp-logo-1.png" alt="XRP Logo" className="h-8 w-8" />
                <h2 className="ml-2 text-xl font-semibold text-gray-900">XRP Balance</h2>
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-gray-900">{balances.xrp.toLocaleString()}</p>
              <p className="ml-2 text-sm text-gray-500">XRP</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">${balances.xrpValue.toLocaleString()} USD</p>
            <div className="mt-4 flex space-x-3">
              <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors duration-200">
                <ArrowDownRight className="h-4 w-4 mr-2" />
                Receive
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <History className="h-6 w-6 text-gray-400" />
                <h2 className="ml-2 text-lg font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
            </div>
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    {transaction.type === 'received' ? (
                      <ArrowDownRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    )}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.type === 'received' ? 'Received' : 'Sent'} {transaction.currency}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.type === 'received' ? 'From: ' : 'To: '}
                        {transaction.type === 'received' ? transaction.from : transaction.to}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.type === 'received' ? '+' : '-'}{transaction.amount} {transaction.currency}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;