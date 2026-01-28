// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import ConnectionHeader from "./Hero/ConnectionHeader/ConnectionHeader";
import CollectionPLP from "./Hero/CollectionPLP/CollectionPLP";
import WomenCollectionPLP from "./Hero/WomenCollectionPLP/WomenCollectionPLP";
import Auth from "./Login/Auth";
import TopbarOrdersView from "./Login/TopbarOrdersView/TopbarOrdersView";
import AdminProducts from "./Admin/AdminProducts/AdminProducts";
import ProductPDP from "./Hero/ProductPDP/ProductPDP";
import WomenProductPDP from "./Hero/WomenProductPDP/WomenProductPDP";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ConnectionHeader />} />

      {/* Collections */}
      <Route path="/men" element={<CollectionPLP />} />
      <Route path="/women" element={<WomenCollectionPLP />} />

      {/* Auth */}
      <Route path="/login" element={<Auth />} />
      <Route path="/orders" element={<TopbarOrdersView />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminProducts />} />

      {/* Products */}
      <Route path="/product/:id" element={<ProductPDP />} />
      <Route path="/women-product/:id" element={<WomenProductPDP />} />
    </Routes>
  );
};

export default App;
