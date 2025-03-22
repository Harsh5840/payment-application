"use client"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter , setFilter] = useState("");
  const navigate  = useNavigate();

  // useEffect(() => {    use it to load all the users
  //   axios.get("http://localhost:5000/api/v1/user/bulk")
  //     .then(response => {
  //       setUsers(response.data.user);
  //     })
  //     .catch(error => console.error("Error fetching users:", error));
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/user/bulk?filter=" + filter)
      .then(response => {
        setUsers(response.data.user);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, [filter]);

  return (
    <div className="flex flex-col w-full h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white">
        <div className="font-bold text-lg">Payment Portal</div>
        <div className="flex items-center gap-2">
          <span>Hello</span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold">U</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 bg-gray-50 flex flex-col gap-5">
        {/* Balance Section */}
        <div className="mb-5">
          <div className="font-bold text-gray-800">Your balance</div>
          <div className="text-2xl font-bold">1000</div>
        </div>

        {/* Users Section */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Users</h2>
          <div className="mb-4">
            <input onChange={(e) => setFilter(e.target.value)}
              type="text"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search users..."
            />
          </div>

          {/* User List */}
          <div className="flex flex-col gap-3">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold">
                      {user.username[0]}
                    </div>
                    <div className="font-medium">{user.username}</div>
                  </div>
                  <button onClick={async ()=>{
                    navigate("/sendmoney?id=" + user.id + "&name=" + user.username)
                  }
                  }
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Send Money
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
