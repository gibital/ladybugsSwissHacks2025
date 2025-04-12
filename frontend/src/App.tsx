import { WalletProvider } from './context/WalletContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreditScore from './pages/CreditScore';
import LoanRequest from './pages/LoanRequest';
import LoanAccepted from './pages/LoanAccepted';
import LoanRejected from './pages/LoanRejected';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/credit-score" element={<CreditScore />} />
          <Route path="/loan" element={<LoanRequest />} />
          <Route path="/loan/accepted" element={<LoanAccepted />} />
          <Route path="/loan/rejected" element={<LoanRejected />} />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;