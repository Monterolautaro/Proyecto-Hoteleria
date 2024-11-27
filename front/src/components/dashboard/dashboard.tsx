import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-100 p-8">
      <h2 className="text-3xl font-semibold mb-6">Dashboard </h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold">Total Users</h3>
          <p className="text-gray-600">Some information here.</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold">Total Hotels</h3>
          <p className="text-gray-600">Some information here.</p>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;