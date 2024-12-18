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
    <div className={`item-list ${category}`}>
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.img} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button>Ver detalle</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
