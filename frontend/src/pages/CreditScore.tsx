import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import UpdateCreditScore from '../components/UpdateCreditScore'


function CreditScore() {
  const navigate = useNavigate();
  
  // Mock credit score data
  const creditScore = 750;
  const maxScore = 850;
  const scorePercentage = (creditScore / maxScore) * 100;
  
  const factors = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
      title: "Payment History",
      status: "Excellent",
      description: "You've made 98% of payments on time"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: "Credit Utilization",
      status: "Good",
      description: "Your credit usage is at 15%"
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-500" />,
      title: "Account Age",
      status: "Very Good",
      description: "Average account age: 6 years"
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-yellow-500" />,
      title: "Credit Mix",
      status: "Fair",
      description: "Limited variety in credit types"
    }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Credit Score Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Credit Score</h2>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-4xl font-bold text-gray-900">{creditScore}</span>
                    <span className="text-sm text-gray-500 ml-2">out of {maxScore}</span>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600">
                    Very Good
                  </span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${scorePercentage}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  ></div>
                </div>
                <UpdateCreditScore />
                {/* <button
                  className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Update Score
                </button> */}
              </div>
            </div>
          </div>

          {/* Score Factors */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Score Factors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {factors.map((factor, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {factor.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{factor.title}</h3>
                        <p className="text-sm font-medium text-indigo-600">{factor.status}</p>
                        <p className="mt-1 text-sm text-gray-500">{factor.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips to Improve Your Score</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">Keep your credit utilization below 30%</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">Make all payments on time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">Maintain a mix of credit types</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                  <span className="text-gray-600">Limit new credit applications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditScore;