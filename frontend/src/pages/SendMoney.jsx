"use client";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";



const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();
  
  const handleTransfer = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/account/transfer",
      {
        to: id,
        amount: amount,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"), //hamne signup k time token banaya tha vo use bhi to krna hai aur hamne auth middlwware lgaya hai transfer me to use token to bhejna hi hai.
        },
      }
    )
    navigate("/success")
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Send Money</h2>

        {/* User Details */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-full text-lg font-bold">
            {name[0]}
          </div>
          <div className="text-lg font-semibold">{name}</div>
        </div>

        {/* Amount Input */}
        <label className="block text-gray-600 mb-2">Amount (in Rs)</label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Transfer Button */}
        <button
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all"
          onClick={handleTransfer}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
