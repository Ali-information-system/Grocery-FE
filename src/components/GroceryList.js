import React, { useState, useEffect } from "react";
import axios from "axios";
import GroceryItemCard from "./GroceryItemCard";

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    unit: "",
    priority: "",
    price: 0,
    brand: "",
    purchase_status: "To Buy",
  });

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/grocery");
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/grocery/${id}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setUpdatedItem({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      priority: item.priority,
      price: item.price,
      brand: item.brand,
      purchase_status: item.purchase_status,
    });
    setIsModalOpen(true);
  };

  const updateItem = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/grocery/${selectedItem.id}`,
        updatedItem
      );
      fetchItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({
      ...updatedItem,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {items.map((item) => (
          <GroceryItemCard
            key={item.id}
            item={item}
            onDelete={deleteItem}
            onUpdate={() => openUpdateModal(item)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl mb-4">Update Grocery Item</h2>
            <div>
              <label className="block">Name</label>
              <input
                type="text"
                name="name"
                value={updatedItem.name}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Category</label>
              <input
                type="text"
                name="category"
                value={updatedItem.category}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={updatedItem.quantity}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Unit</label>
              <input
                type="text"
                name="unit"
                value={updatedItem.unit}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Priority</label>
              <select
                name="priority"
                value={updatedItem.priority}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <label className="block">Price</label>
              <input
                type="number"
                name="price"
                value={updatedItem.price}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Brand</label>
              <input
                type="text"
                name="brand"
                value={updatedItem.brand}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block">Purchase Status</label>
              <select
                name="purchase_status"
                value={updatedItem.purchase_status}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              >
                <option value="To Buy">To Buy</option>
                <option value="Purchased">Purchased</option>
              </select>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={updateItem}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
