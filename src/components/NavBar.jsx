import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/category/Samsung">Samsung</Link>
      <Link to="/category/Motorola">Motorola</Link>
      <Link to="/cart">Carrito</Link>
    </nav>
  );
};

export default NavBar;
