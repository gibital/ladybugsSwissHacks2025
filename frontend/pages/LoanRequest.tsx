import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, DollarSign, Globe, Send, FileText } from 'lucide-react';

function LoanRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    walletAddress: '',
    loanAmount: '',
    country: '',
    loanType: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle loan request submission here
    console.log('Loan request submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Complete list of countries
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", 
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", 
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", 
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", 
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", 
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", 
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", 
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", 
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", 
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
    "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", 
    "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  // Mock wallet addresses
  const walletAddresses = [
    { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", label: "Main Wallet" },
    { address: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac", label: "Secondary Wallet" },
    { address: "0x9876543210abcdef0123456789abcdef01234567", label: "Savings Wallet" }
  ];

  // Loan types
  const loanTypes = [
    "Fixed-term collateralized debt",
    "Personal line of credit"
  ];

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
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Request a Loan</h1>
            <p className="mt-2 text-gray-600">Fill out the form below to submit your loan request</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Loan Type Dropdown */}
            <div>
              <label htmlFor="loanType" className="block text-sm font-medium text-gray-700">
                Loan Type
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="loanType"
                  id="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select loan type</option>
                  {loanTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wallet Address Dropdown */}
            <div>
              <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-700">
                Select Wallet
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Wallet className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="walletAddress"
                  id="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select a wallet</option>
                  {walletAddresses.map((wallet) => (
                    <option key={wallet.address} value={wallet.address}>
                      {wallet.label} ({wallet.address.slice(0, 6)}...{wallet.address.slice(-4)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Loan Amount */}
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">
                Loan Amount (RLUSD)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="loanAmount"
                  id="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter loan amount"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Terms and Conditions</h3>
              <div className="text-sm text-gray-600 space-y-4">
                <p>By submitting this loan request, you agree to the following terms:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>All information provided is accurate and complete</li>
                  <li>You understand that this is a binding financial agreement</li>
                  <li>You accept the interest rates and repayment terms as specified</li>
                  <li>You acknowledge that failure to repay may result in penalties</li>
                  <li>Your collateral may be liquidated in case of default (for collateralized loans)</li>
                </ul>
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      I have read and agree to the terms and conditions
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!acceptedTerms}
                className={`w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white ${
                  acceptedTerms 
                    ? 'bg-indigo-600 hover:bg-indigo-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Loan Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoanRequest;