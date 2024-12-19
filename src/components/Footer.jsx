const Footer = () => {
    return (
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4 mb-3">
              <h5>Contacto</h5>
              <p>Email: stouch@tienda.com</p>
              <p>Teléfono: +54 9 1234 567890</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Domicilio</h5>
              <p>Avenida del Libertador 912, Capital Federal, Argentina</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>&copy; 2024 Tienda</h5>
              <p>Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  