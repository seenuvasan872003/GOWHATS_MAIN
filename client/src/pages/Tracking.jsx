import React, { useState } from 'react';

const Tracking = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    trackingNumber: '',
    weight: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTrackShipment = () => {
    alert(`Tracking Details: 
Order Number: ${formData.orderNumber}
Tracking Number: ${formData.trackingNumber}
Weight: ${formData.weight} gms`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Track Your Shipment
        </h1>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="orderNumber"
              className="block text-sm font-semibold text-black mb-2"
            >
              Order Number
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              placeholder="Enter your Order Number"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="trackingNumber"
              className="block text-sm font-semibold text-black mb-2"
            >
              Tracking Number
            </label>
            <input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              placeholder="Enter your Tracking Number"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-semibold text-black mb-2"
            >
              Weight (gms)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="Enter weight in grams"
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleTrackShipment}
            className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Track Shipment
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          Need help?{' '}
          <a href="#!" className="text-green-500 font-semibold">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Tracking;
