import { useEffect, useState } from "react";
import Model from "../Model/Model";
import api from "../Api/Api";

function ProductsActions() {
  const [products, setProducts] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  // Handle adding a new product
  const handleAddProduct = async (newProduct) => {
    try {
      await api.post("/Product/CreateProduct", newProduct);

      // بعد إضافة المنتج بنجاح، قم بإعادة جلب المنتجات
      await getAllProduct(); // جلب المنتجات من جديد من الـ API

      setIsOpened(false); // إغلاق النافذة المنبثقة
    } catch (error) {
      console.log(error);
    }
  };

  // Handle fetching all products
  const getAllProduct = async () => {
    try {
      const response = await api.get("/Product/AllProduct");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(`/Product?Id=${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await api.put(
        `/Product/${updatedProduct.id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? response.data : product
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="container mx-auto py-5 w-full">
      <div className="flex justify-between items-center mb-5 px-10">
        <h1>Products</h1>
        <button
          onClick={() => setIsOpened(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
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
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Quantity
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Stock
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={product.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-12 w-12 object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.description}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.quantity}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex items-center gap-4">
                  <button
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                    onClick={() => handleUpdateProduct(product)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Model
        isOpened={isOpened}
        onSubmit={handleAddProduct}
        closeModal={() => setIsOpened(false)}
      />
    </div>
  );
}

export default ProductsActions;
