import React, { useState } from "react";
import axios from "axios";

const AddItemForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "fruit",
    quantity: 1,
    unit: "kilogram",
    priority: "medium",
    price: "",
    brand: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/grocery", formData);
      onItemAdded();
      setFormData({
        name: "",
        category: "fruit",
        quantity: 1,
        unit: "kilogram",
        priority: "medium",
        price: "",
        brand: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded p-6 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold mb-4">Add Grocery Item</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        >
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="bakery">Bakery</option>
          <option value="dairy">Dairy</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Brand</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
