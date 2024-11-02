import { useEffect, useState } from "react";
import api from "../Api/Api";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const handleDeleteUser = async (UserId) => {
    try {
      await api.delete(`/Account/${UserId}`);
      setAllUsers((prevProducts) =>
        prevProducts.filter((user) => user.id !== UserId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const GetAllUsers = async () => {
    try {
      const response = await api.get("/Account/AllUsers");
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllUsers();
  }, []);
  return (
    <div className="w-full container mx-auto mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
              </th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                FirstName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                LastName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                UserName
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Age
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                CartProducts
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                FavoriteProducts
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  {user.firstName}
                </td>
                <td className="whitespace-nowrap px-4 py-2">{user.lastName}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.userName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.age}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.cardCount}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {user.favoriteCount}
                </td>

                <td className="whitespace-nowrap px-4 py-2 ">
                  <button
                    className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
