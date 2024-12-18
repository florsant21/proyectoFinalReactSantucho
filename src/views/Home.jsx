import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsByCategory } from "../services/firebase";

const Home = () => {
  const [samsungProducts, setSamsungProducts] = useState([]);
  const [motorolaProducts, setMotorolaProducts] = useState([]);

  useEffect(() => {
    fetchProductsByCategory("Samsung").then(setSamsungProducts);
    fetchProductsByCategory("Motorola").then(setMotorolaProducts);
  }, []);

  return (
    <div>
      <section>
        <h1>Bienvenidos a nuestra tienda</h1>
        <p>Encuentra los mejores productos de tecnología.</p>
      </section>
      <section>
        <h2>Productos Samsung</h2>
        <div>
          {samsungProducts.length > 0 ? (
            samsungProducts.map((product) => (
              <div key={product.id}>
                <img src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <Link to={`/item/${product.id}`}>
                  <button>Ver detalle</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay productos Samsung disponibles.</p>
          )}
        </div>
      </section>
      <section>
        <h2>Productos Motorola</h2>
        <div>
          {motorolaProducts.length > 0 ? (
            motorolaProducts.map((product) => (
              <div key={product.id}>
                <img src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <Link to={`/item/${product.id}`}>
                  <button>Ver detalle</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay productos Motorola disponibles.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
