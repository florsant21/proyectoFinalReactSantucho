import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const Cart = () => {
  const { cart, removeItem, clearCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const orderNumber = Math.floor(Math.random() * 1000000);

    Swal.fire({
      icon: "success",
      title: "¡Gracias por tu compra!",
      text: `Tu número de pedido es: #${orderNumber}`,
      showConfirmButton: false,
      timer: 3000,
    });

    clearCart();
  };

  return (
    <div className="container mt-5">
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-between mb-3"
            >
              <div className="flex-grow-1">
                <p className="mb-0">
                  {item.title} (x{item.quantity})
                </p>
              </div>
              <p className="mb-0 me-3">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <div>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <hr />
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <div className="text-center">
            <button className="btn btn-warning mt-3 me-2" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button className="btn btn-success mt-3" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
