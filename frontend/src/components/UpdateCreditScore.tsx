// src/components/UpdateCreditScore.tsx
import { useState, useEffect } from 'react';
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



// import axios from 'axios';

// function UpdateCreditScore() {
//  // When the button is clicked, this function is triggered.
//  async function handleClick() {
//     // Define the payload you want to send
//     const payload = {
//       wallet_address: 'Hello from the frontend!',
//       additionalData: { key: 'value' },
//     };

//     // Retrieve the JWT token (previously stored during sign-in)
//     const token = localStorage.getItem('access_token');
//     const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

//     try {
//       // Make a POST request to the protected route on the backend
//       const response = await axios.post(`${backendUrl}/api/balance`, payload, {
//         headers: {
//           // Pass the token in the Authorization header
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       console.log('Response from backend:', response.data);
//       // Handle the response as needed (update state, navigate, etc.)
//     } catch (error: any) {
//       console.error('Error in API call:', error.response?.data || error.message);
//       // Display error feedback to the user if necessary
//     }
//   }

//   return <button onClick={handleClick}>Update credit score</button>;
// }

// export default UpdateCreditScore;