import React from "react";

function StatCard({ icon, label, count }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="text-3xl font-bold text-gray-800">{count}</div>
    </div>
  );
}

export default StatCard;
