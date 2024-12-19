import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
      <h1 className="mb-4 text-center">
        {category ? `Productos de ${category}` : "Todos los productos"}
      </h1>
      {products.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
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
                  <Link to={`/item/${product.id}`} className="btn btn-primary">
                    Ver detalle
                  </Link>
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
