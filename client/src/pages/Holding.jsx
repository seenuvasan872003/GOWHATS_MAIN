import React from "react";

const Holding = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-green-200">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-green-800 mb-4">
          Enter Holding Details
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Order Number</label>
            <input
              type="text"
              placeholder="Order Number"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Holding Product</label>
            <input
              type="text"
              placeholder="Holding Product"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Holding
          </button>
        </form>
      </div>
    </div>
  );
};

export default Holding;
