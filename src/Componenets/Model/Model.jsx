import { useEffect, useState } from "react";
import api from "../Api/Api";

const Model = ({ isOpened, onSubmit, closeModal }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
    quantity: "",
    stock: "",
    imageFile: null, // Ensure to keep this for file uploads
  });
  const [categoryData, setCategoryData] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNewProduct({ ...newProduct, imageFile: files[0] }); // Use imageFile key here
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const getCategory = async () => {
    try {
      const response = await api.get("/Category");
      setCategoryData(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]); // Use newProduct to get values
    }

    onSubmit(formData); // Send the formData to the parent component
    setNewProduct({
      name: "",
      price: 0,
      description: "",
      categoryId: "",
      stock: 0,
      quantity: 0,
      imageFile: null, // Reset imageFile after submission
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  if (!isOpened) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-lg font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center w-full gap-4">
            <div className="mb-4 w-full">
              <label className="block mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="mb-4 w-full">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>

          <div className="flex justify-center items-center w-full gap-4">
            <div className="mb-4 w-full">
              <label htmlFor="categoryId">Choose Category:</label>
              <select
                id="categoryId"
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryData.map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center w-full gap-4">
            <div className="mb-4 w-full">
              <label className="block mb-1" htmlFor="quantity">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={100} // Limiting to 100 for demo purposes, adjust as needed
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block mb-1" htmlFor="imageFile">
                Image
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile" // Use imageFile for the input name
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Model;
