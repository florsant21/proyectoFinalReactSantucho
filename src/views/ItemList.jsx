import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts, fetchProductsByCategory } from "../services/firebase";

const ItemList = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category).then((data) => {
        setProducts(data);
      });
    } else {
      fetchProducts().then((data) => {
        setProducts(data);
      });
    }
  }, [category]);

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">
        {category ? `Productos de ${category}` : "Todos los productos"}
      </h2>
      {products.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-4 g-4">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.img}
                  alt={product.title}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary">Añadir al carrito</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ItemList;
