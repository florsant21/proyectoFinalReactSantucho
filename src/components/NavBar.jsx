import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">
        <img
          src="/public/icono.png"
          alt="Tienda"
          style={{ width: "30px", height: "40px" }} 
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Samsung">
              Samsung
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Motorola">
              Motorola
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/Apple">
              Apple
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <FaShoppingCart />{" "}
              {totalItems > 0 && (
                <span className="badge bg-danger ms-2">{totalItems}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  );
};

export default NavBar;
