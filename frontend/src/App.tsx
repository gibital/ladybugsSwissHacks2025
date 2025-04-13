import { WalletProvider } from './context/WalletContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import CreditScore from './pages/CreditScore';
import LoanRequest from './pages/LoanRequest';
import LoanAccepted from './pages/LoanAccepted';
import LoanRejected from './pages/LoanRejected';
import SignUp from './pages/SignUp';

function App() {
  return (
    <WalletProvider>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/credit-score" element={<CreditScore />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/loan" element={<LoanRequest />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/loan/accepted" element={<LoanAccepted />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/loan/rejected" element={<LoanRejected />} />
            </Route>
            <Route path="/" element={<Navigate to="/signin" replace />} />
          </Routes>
        </Router>
    </WalletProvider>
  );
}

export default App;