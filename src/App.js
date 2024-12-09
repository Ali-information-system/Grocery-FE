import React from "react";
import AddItemForm from "./components/AddItemForm";
import GroceryList from "./components/GroceryList";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Grocery Manager
        </h1>
        <AddItemForm onItemAdded={() => window.location.reload()} />
        <GroceryList />
      </div>
    </div>
  );
}

export default App;
