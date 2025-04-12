import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Percent, Clock, Shield, Download } from 'lucide-react';

function LoanAccepted() {
  const navigate = useNavigate();

  // Mock loan details
  const loanDetails = {
    amount: 5000,
    apr: 12.5,
    term: 12,
    monthlyPayment: 445.89,
    totalInterest: 350.68,
    totalRepayment: 5350.68,
    firstPaymentDate: '2024-04-15',
    lastPaymentDate: '2025-04-15'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Congratulations!</h1>
          <p className="mt-2 text-lg text-gray-600">Your loan request has been approved</p>
        </div>

        {/* Loan Summary */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Loan Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">${loanDetails.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Percentage Rate (APR)</p>
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-gray-400 mr-1" />
                  <p className="text-xl font-semibold text-gray-900">{loanDetails.apr}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Term</p>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                  <p className="text-xl font-semibold text-gray-900">{loanDetails.term} months</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Payment</p>
                <p className="text-2xl font-bold text-gray-900">${loanDetails.monthlyPayment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-xl font-semibold text-gray-900">${loanDetails.totalInterest}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Repayment</p>
                <p className="text-xl font-semibold text-gray-900">${loanDetails.totalRepayment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Payment Schedule</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-500">
              <Download className="h-5 w-5 mr-1" />
              Download Schedule
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">First Payment Due</p>
                <p className="text-base font-medium text-gray-900">{loanDetails.firstPaymentDate}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Last Payment Due</p>
                <p className="text-base font-medium text-gray-900">{loanDetails.lastPaymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">1</span>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-900">Review Your Documents</p>
                <p className="mt-1 text-sm text-gray-500">
                  Please review all loan documents carefully before proceeding
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">2</span>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-900">Sign Electronically</p>
                <p className="mt-1 text-sm text-gray-500">
                  Sign your loan agreement electronically through our secure portal
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">3</span>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-900">Receive Funds</p>
                <p className="mt-1 text-sm text-gray-500">
                  Once signed, funds will be transferred to your wallet within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanAccepted;