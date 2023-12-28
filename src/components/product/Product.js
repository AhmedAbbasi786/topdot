import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../stores/slices/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Product( product ) {
  const dispatch = useDispatch();

  const addToCartHandler = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
   
      <div>
        <div className="card m-4" style={{ width: "16rem" }}>
        <Link
    to={{
      pathname: `/product-detail/${product.id}`,
    }} className="card-link">
          <img
            height={200}
            width={200}
            src={product.images[0]}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {product.title.length > 10
                ? `${product.title.slice(0, 15)}...`
                : product.title}
            </h5>

            <p className="card-text">
              {product.description.length > 50
                ? `${product.description.slice(0, 50)}...`
                : product.description}
            </p>

            <div className="d-flex justify-content-between align-items-center">
              <p className="card-text mt-2 text-danger">${product.price}</p>
              <button
                className="btn btn-primary"
                onClick={(e) => addToCartHandler(e, product)}
                style={{ backgroundColor: "#007BFF", color: "#FFF" }}
              >
                <FaShoppingCart style={{ marginRight: "5px" }} />
                Add to Cart
              </button>
            </div>
          </div>
          </Link>
        </div>
      </div>
   
  );
}
