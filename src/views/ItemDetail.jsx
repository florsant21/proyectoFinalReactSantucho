import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../services/firebase";
import Swal from "sweetalert2";

const ItemDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, getItemQuantity } = useCart();

  useEffect(() => {
    fetchProductById(id).then(setProduct).catch(console.error);
  }, [id]);

  const handleAddToCart = () => {
    const currentQuantityInCart = getItemQuantity(product.id);

    if (!product.stock) {
      Swal.fire({
        icon: "error",
        title: "Sin stock",
        text: "Este producto no está disponible actualmente.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (currentQuantityInCart + quantity > product.stock) {
      Swal.fire({
        icon: "warning",
        title: "Stock insuficiente",
        text: `Solo puedes agregar ${
          product.stock - currentQuantityInCart
        } unidades más.`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

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

  const currentQuantityInCart = getItemQuantity(product.id);
  const maxQuantityAvailable = product.stock - currentQuantityInCart;

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
              <p className="card-text">
                <strong>Stock disponible:</strong> {product.stock}
              </p>
              <div className="d-flex align-items-center justify-content-center mb-3">
                <label htmlFor="quantity" className="me-2">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max={maxQuantityAvailable}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control w-25"
                  disabled={!product.stock || maxQuantityAvailable <= 0}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                disabled={!product.stock || maxQuantityAvailable <= 0}
              >
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
