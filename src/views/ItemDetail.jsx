import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../services/firebase";
import Swal from "sweetalert2";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch(console.error);
  }, [id]);

  const handleAddToCart = () => {
    addItem(product, quantity);

    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito",
      text: `${quantity} x ${product.title}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!product) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  return (
    <div className="container mt-4 mb-5">
      <div>
        <h1 className="text-center mb-3">Detalle</h1>
      </div>
      <div className="card">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.img}
              alt={product.title}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8 text-center">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">
                <strong>Precio:</strong> ${product.price}
              </p>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <label htmlFor="quantity" className="me-2">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control w-25"
                />
              </div>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
