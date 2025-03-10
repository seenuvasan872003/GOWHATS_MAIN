import React, { useState } from "react";

const Packing = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleFetchDetails = () => {
    // Simulating fetching order details from a database or API
    const mockData = {
      "ORD123": {
        orderId: "ORD123",
        products: ["Product A", "Product B", "Product C"],
        customer: "John Doe",
        address: "123 Main St, City, Country",
        status: "READY FOR PACKING",
      },
      "ORD456": {
        orderId: "ORD456",
        products: ["Product D", "Product E"],
        customer: "Jane Smith",
        address: "456 Elm St, City, Country",
        status: "PACKED",
      },
    };

    const details = mockData[orderNumber.toUpperCase()];
    setOrderDetails(details || "Order not found");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Order Packing System
        </h1>

        <div className="flex flex-col gap-3 md:flex-row md:gap-5 md:items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Enter Order Number or Scan QR Code"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <button
            onClick={() => {
              handleFetchDetails();
              setOrderNumber("");
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow font-bold m-0"
          >
            Fetch Details
          </button>
        </div>

        {orderDetails && (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            {typeof orderDetails === "string" ? (
              <p className="text-red-500 font-bold text-center">{orderDetails}</p>
            ) : (
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">Order Details</h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Order ID:</span> {orderDetails.orderId}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Customer:</span> {orderDetails.customer}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Address:</span> {orderDetails.address}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Status:</span> {orderDetails.status}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Products:</span>
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  {orderDetails.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Packing;
