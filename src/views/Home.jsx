import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../services/firebase";

const Home = () => {
  const [samsungProducts, setSamsungProducts] = useState([]);
  const [motorolaProducts, setMotorolaProducts] = useState([]);
  const [appleProducts, setAppleProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory("Samsung").then(setSamsungProducts);
    fetchProductsByCategory("Motorola").then(setMotorolaProducts);
    fetchProductsByCategory("Apple").then(setAppleProducts);
  }, []);

  const renderProducts = (products) => (
    <div className="row row-cols-2 row-cols-md-4 g-4 me-5 ms-5 text-center">
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
  );

  return (
    <>
      <section>
        <img src="./smart.jpg" alt="portada" className="img-fluid w-100 mb-4" />
      </section>
      <section>
        <h2 className="mb-3 text-center">Productos Samsung</h2>
        {samsungProducts.length > 0 ? (
          renderProducts(samsungProducts)
        ) : (
          <p>No hay productos Samsung disponibles.</p>
        )}
      </section>
      <section>
        <h2 className="mt-5 mb-3 text-center">Productos Motorola</h2>
        {motorolaProducts.length > 0 ? (
          renderProducts(motorolaProducts)
        ) : (
          <p>No hay productos Motorola disponibles.</p>
        )}
      </section>
      <section className="mb-5">
        <h2 className="mt-5 mb-3 text-center">Productos Apple</h2>
        {appleProducts.length > 0 ? (
          renderProducts(appleProducts)
        ) : (
          <p>No hay productos Apple disponibles.</p>
        )}
      </section>
    </>
  );
};

export default Home;
