import { Route, Routes } from "react-router-dom";
import Navbar from "./Componenets/Navbar/Navbar";
import ProductsActions from "./Componenets/ProductsActions/ProductsActions";
import UsersPage from "./Componenets/Users/UsersPage";
import Statistic from "./Componenets/DashboardStatistic/Statistic";
import Category from "./Componenets/Category/Category";

function App() {
  return (
    <div className=" flex gap-2">
      <Navbar />
      <Routes>
        <Route path="/Products" element={<ProductsActions />} />
        <Route path="/Allusers" element={<UsersPage />} />
        <Route path="/Dashboard" element={<Statistic />} />
        <Route path="/Category" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
