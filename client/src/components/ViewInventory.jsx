import React from "react";

const ViewInventory = ({ onBack }) => {
  const inventory = [
    {
      product_id: "1",
      product_title: "Product A",
      description: "Description of Product A",
      price: 100,
      category: "Category A",
    },
    {
      product_id: "2",
      product_title: "Product B",
      description: "Description of Product B",
      price: 200,
      category: "Category B",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Inventory</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Product ID</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.product_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.product_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.product_title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{item.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onBack}
          className="bg-whatsapp-green text-white px-4 py-2 mt-6 rounded-lg"
        >
          Back to Inventory Management
        </button>
      </div>
    </div>
  );
};

export default ViewInventory;
