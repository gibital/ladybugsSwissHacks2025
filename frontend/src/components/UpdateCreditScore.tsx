// src/components/UpdateCreditScore.tsx
import { useState } from 'react';
import axios from 'axios';

function UpdateCreditScore() {
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // You can store the backend URL in an environment variable (for VITE, use VITE_BACKEND_URL).
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  const token = localStorage.getItem('access_token');

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setResponseData(null);
    
    // Define the payload to send.
    const payload = {
      wallet_address: 'rw9Pvqf292gNnwP4QXESH52dhTeYNaBDhE',
    };

    try {
      // Make the asynchronous POST request.
      const response = await axios.post(
        `${backendUrl}/api/updateCreditScore`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            // Include an authorization header if needed.
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseData(response.data);
    } catch (err: any) {
      console.error('Error in API call:', err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200" onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Update Credit Score'}
      </button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {responseData && (
        <div>
          <h2>Response Data</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UpdateCreditScore;