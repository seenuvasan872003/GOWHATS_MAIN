import React, { useState } from 'react';
import { saveAs } from 'file-saver';

const PrintManagement = () => {
    const [orders, setOrders] = useState([
        {
          date: '1/22/2025 10:57:54 AM',
          orderId: 2465,
          products: 'PH_395 (2)',
          customer: 'Pooja Balaji',
          payment: 'COMPLETED',
          price: '₹320.00',
          printStatus: 'NOT_PRINTED',
          trackingStatus: 'NOT_SHIPPED',
        },
        {
          date: '1/21/2025 03:45:12 PM',
          orderId: 1324,
          products: 'NX_720 (1), LM_115 (3)',
          customer: 'Rajesh Kumar',
          payment: 'PENDING',
          price: '₹1,200.00',
          printStatus: 'NOT_PRINTED',
          trackingStatus: 'NOT_SHIPPED',
        },
        {
          date: '1/20/2025 11:12:34 AM',
          orderId: 5637,
          products: 'BX_215 (4)',
          customer: 'Anitha Devi',
          payment: 'COMPLETED',
          price: '₹640.00',
          printStatus: 'PRINTED',
          trackingStatus: 'SHIPPED',
        },
        {
          date: '1/19/2025 08:10:22 AM',
          orderId: 7896,
          products: 'VR_123 (2), DS_456 (1)',
          customer: 'Michael Thomas',
          payment: 'FAILED',
          price: '₹800.00',
          printStatus: 'NOT_PRINTED',
          trackingStatus: 'NOT_SHIPPED',
        },
        {
          date: '1/18/2025 05:34:56 PM',
          orderId: 4568,
          products: 'QW_987 (1)',
          customer: 'Sophia Lee',
          payment: 'COMPLETED',
          price: '₹1,500.00',
          printStatus: 'PRINTED',
          trackingStatus: 'NOT_SHIPPED',
        },
        {
          date: '1/17/2025 02:45:12 PM',
          orderId: 9821,
          products: 'KL_123 (3)',
          customer: 'James Anderson',
          payment: 'COMPLETED',
          price: '₹960.00',
          printStatus: 'NOT_PRINTED',
          trackingStatus: 'SHIPPED',
        },
      ]);
      
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handlePrintAll = () => {
    alert('Printing all orders...');
  };

  const handlePrintSelected = () => {
    alert(`Printing orders: ${selectedOrders.join(', ')}`);
  };

  const handleDownloadCSV = () => {
    const csvData = orders
      .map((order) =>
        [
          order.date,
          order.orderId,
          order.products,
          order.customer,
          order.payment,
          order.price,
          order.printStatus,
          order.trackingStatus,
        ].join(',')
      )
      .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]); // Deselect all
    } else {
      setSelectedOrders(orders.map((order) => order.orderId)); // Select all
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.orderId.toString().includes(searchTerm)
  );

  return (
    <div className="bg-gradient-to-br from-grey-50 to-grey-100 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Print Management System
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={handlePrintAll}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-green-700 transition duration-200"
          >
            Print All
          </button>
          <input
            type="text"
            placeholder="Search Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handlePrintSelected}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition duration-200"
          >
            Print Selected
          </button>
          <button
            onClick={handleDownloadCSV}
            className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-purple-700 transition duration-200"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-auto max-h-96 rounded-2xl border border-gray-200 shadow-lg">
          <table className="min-w-full text-left text-gray-800">
            <thead className="bg-gradient-to-r from-green-200 to-green-300 text-gray-900">
              <tr>
                <th className="p-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedOrders.length === orders.length}
                  />
                </th>
                <th className="p-4">Date</th>
                <th className="p-4">Order ID</th>
                <th className="p-4">Products</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Price</th>
                <th className="p-4">Print Status</th>
                <th className="p-4">Tracking Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.orderId)}
                      onChange={() => handleCheckboxChange(order.orderId)}
                    />
                  </td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">{order.orderId}</td>
                  <td className="p-4">{order.products}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.payment}</td>
                  <td className="p-4">{order.price}</td>
                  <td
                    className={`p-4 font-semibold ${
                      order.printStatus === 'PRINTED'
                        ? 'text-green-600'
                        : 'text-yellow-500'
                    }`}
                  >
                    {order.printStatus}
                  </td>
                  <td
                    className={`p-4 font-semibold ${
                      order.trackingStatus === 'SHIPPED'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}
                  >
                    {order.trackingStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrintManagement;
