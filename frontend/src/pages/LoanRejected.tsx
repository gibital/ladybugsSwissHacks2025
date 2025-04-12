import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, XCircle, Mail, MessageSquare, Phone, HelpCircle } from 'lucide-react';

function LoanRejected() {
  const navigate = useNavigate();

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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Rejection Message */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Application Status Update</h1>
          <p className="mt-2 text-lg text-gray-600">
            We're sorry, but we couldn't approve your loan request at this time
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Understanding Our Decision</h2>
          <p className="text-gray-600 mb-6">
            While we can't disclose specific details about our decision, common factors that affect loan approval include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
            <li>Credit score and history</li>
            <li>Current debt-to-income ratio</li>
            <li>Length of credit history</li>
            <li>Recent credit inquiries</li>
            <li>Available collateral value</li>
          </ul>
          <p className="text-gray-600">
            We encourage you to review your credit report and consider reapplying after addressing any potential issues.
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Need More Information?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Speak with a loan specialist about your application
              </p>
              <p className="text-lg font-semibold text-gray-900">1-800-555-0123</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9am-5pm EST</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Mail className="h-6 w-6 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">Email Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Send us your questions and we'll respond within 24 hours
              </p>
              <p className="text-lg font-semibold text-gray-900">support@example.com</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-lg font-medium text-gray-900">Additional Resources</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-500">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Schedule a consultation with a loan advisor
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-500">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Learn about improving your credit score
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-500">
                  <Mail className="h-5 w-5 mr-2" />
                  Sign up for our financial education newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRejected;