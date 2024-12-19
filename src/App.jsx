import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ItemList from "./views/ItemList";
import ItemDetail from "./views/ItemDetail";
import Cart from "./views/Cart";
import Home from "./views/Home";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<ItemList />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
