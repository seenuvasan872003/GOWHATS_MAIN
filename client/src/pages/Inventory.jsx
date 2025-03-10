import React, { useState } from "react";
import ViewInventory from "../components/ViewInventory";

const InventoryPage = () => {
  const [showViewInventory, setShowViewInventory] = useState(false);

  const handleViewInventory = () => {
    setShowViewInventory(true);
  };

  const handleBackToInventory = () => {
    setShowViewInventory(false);
  };

  const handleSubmit = () => {

  }

  return showViewInventory ? (
    <ViewInventory onBack={handleBackToInventory} />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="md:flex justify-between items-center mb-6">
          <h1 className="mb-4 md:mb-1 text-2xl font-bold text-gray-800">
            Inventory Management System
          </h1>
          <button
            onClick={handleViewInventory}
            className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            View Inventory
          </button>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Item</h2>
        <form
          id="inventoryForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label htmlFor="product_id" className="block text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="product_id"
              // value={formData.product_id}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="product_title" className="block text-gray-700">
              Product Title
            </label>
            <input
              type="text"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="product_title"
              // value={formData.product_title}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              className="form-textarea mt-1 w-full border rounded-lg p-2"
              name="description"
              // value={formData.description}
              // onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="condition" className="block text-gray-700">
              Condition
            </label>
            <select
              className="form-select mt-1 w-full border rounded-lg p-2"
              name="condition"
              // value={formData.condition}
              // onChange={handleInputChange}
              required
            >
              <option value="new">New</option>
              <option value="refurbished">Refurbished</option>
              <option value="used">Used</option>
              <option value="freshly prepared">Freshly Prepared</option>
            </select>
          </div>
          <div>
            <label htmlFor="link" className="block text-gray-700">
              Product Link
            </label>
            <input
              type="url"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="link"
              // value={formData.link}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="image_file" className="block text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="image_file"
              // onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div>
            <label htmlFor="image_url" className="block text-gray-700">
              Or Image URL
            </label>
            <input
              type="url"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="image_url"
              // value={formData.image_url}
              // onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-gray-700">
              Price
            </label>
            <input
              type="number"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="price"
              // value={formData.price}
              // onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label htmlFor="brand" className="block text-gray-700">
              Brand
            </label>
            <input
              type="text"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="brand"
              // value={formData.brand}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <input
              type="text"
              className="form-input mt-1 w-full border rounded-lg p-2"
              name="category"
              // value={formData.category}
              // onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Item
          </button>
        </form>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
          Bulk Upload
        </h2>
        <form
          id="bulkUploadForm"
          // onSubmit={handleBulkUploadSubmit}
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="file"
            // onChange={handleBulkUploadChange}
            accept=".csv"
            className="form-input border rounded-lg p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-[#25D366] text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
          >
            Upload CSV
          </button>
        </form>
        {/* Add Item Form */}
        {/* Include the rest of your form here */}
      </div>
    </div>
  );
};

export default InventoryPage;
