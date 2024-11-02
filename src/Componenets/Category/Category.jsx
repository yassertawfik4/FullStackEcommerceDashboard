import { useEffect, useState } from "react";
import api from "../Api/Api";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [isOpend, setIsOpend] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state to track edit mode
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track category being updated

  const [newCategory, setNewCategory] = useState({
    name: "",
    imageFile: null,
  });

  const getCategoryData = async () => {
    try {
      const response = await api.get("/Category");
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (catoId) => {
    try {
      await api.delete(`/Category?Id=${catoId}`);
      setCategory((prevCategories) =>
        prevCategories.filter((cate) => cate.id !== catoId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newCategory) {
      formData.append(key, newCategory[key]);
    }

    try {
      if (isEditMode) {
        // Update category if in edit mode
        await api.put(`/Category/${selectedCategoryId}`, formData);
      } else {
        // Add category if not in edit mode
        await api.post("/Category", formData);
      }
      getCategoryData();
      setIsOpend(false);
      setNewCategory({ name: "", imageFile: null });
      setIsEditMode(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setNewCategory({ ...newCategory, imageFile: files[0] });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  const handleEditCategory = (category) => {
    setIsEditMode(true);
    setIsOpend(true);
    setSelectedCategoryId(category.id);
    setNewCategory({
      name: category.name,
      imageFile: null, // Reset the file input
    });
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div className="container mx-auto w-full my-5">
      <div className="flex justify-between items-center px-10">
        <h1>Category Data</h1>
        <button
          onClick={() => {
            setIsOpend(true);
            setIsEditMode(false);
            setNewCategory({ name: "", imageFile: null });
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>
      <div className="overflow-x-auto w-full text-center">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {category.map((item, index) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 flex justify-center py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleDeleteCategory(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="inline-block rounded bg-yellow-600 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-700 ml-2"
                    onClick={() => handleEditCategory(item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpend && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">
              {isEditMode ? "Update Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="imageFile">
                  Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full"
                  required={!isEditMode} // Make it required only for new categories
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpend(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  {isEditMode ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
