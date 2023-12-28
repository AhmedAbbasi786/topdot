import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../stores/slices/productSlice";
import { addToCart, removeFromCart } from "../stores/slices/cartSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.total);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(searchProducts(query));
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container py-2">
          <Link className="navbar-brand" to="/">
            E-commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-auto align-items-center">
              <li className="nav-item">
                <form className="d-flex">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
              </li>
            </ul>
            <div className="btn-group position-relative">
              <button
                className="btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#cartModal"
              >
                <FaCartPlus size="2em" />
                {total > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {products.length}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bootstrap Cart Modal */}
      <div
        className="modal fade"
        id="cartModal"
        tabIndex="-1"
        aria-labelledby="cartModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="cartModalLabel">
                Your Cart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Cart items */}
              <ul className="shopping-cart-items list-unstyled">
                {products.map((product) => (
                  <li key={product.id} className="cart-item">
                    <div className="row">
                      {/* Product Image */}
                      <div className="col-4">
                        <img
                          width={50}
                          height={50}
                          src={product.images[0]}
                          alt={product.name}
                          className="product-image img-fluid"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="col-5 d-flex flex-column justify-content-between">
                        <div className="product-name">{product.title}</div>
                        <div className="product-quantity">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            -
                          </button>
                          <span className="mx-2">{product.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => dispatch(addToCart(product))}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Product Price */}
                      <div className="col-3 text-end">
                        <div className="product-price">${product.price}</div>
                      </div>
                    </div>
                    <hr className="cart-divider" />
                  </li>
                  
                ))}
                {/* Cart total */}
                <div className="cart-total mt-4 d-flex justify-content-between">
                  <span>Total:</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeCart}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
