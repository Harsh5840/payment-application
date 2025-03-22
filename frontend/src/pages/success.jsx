"use client";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 flex items-center justify-center bg-green-500 text-white rounded-full mx-auto mb-4 text-3xl">
          ✓
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Transfer Successful</h2>
        <p className="text-gray-600 mb-6">You have successfully sent money.</p>

        {/* Back to Home Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all"
          onClick={() => 
            navigate("/dashboard")} // Change this to your home page route
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
