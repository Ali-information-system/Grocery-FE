import React from "react";

const GroceryItemCard = ({ item, onDelete, onUpdate }) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p>Category: {item.category}</p>
      <p>
        Quantity: {item.quantity} {item.unit}
      </p>
      <p>Status: {item.purchase_status}</p>
      <p>Priority: {item.priority}</p>
      <p>Price: ${item.price}</p>
      <p>Brand: {item.brand}</p>
      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => onUpdate(item)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default GroceryItemCard;
