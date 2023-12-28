// ProductDetail.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../../stores/slices/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetail = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log(listingId, "Parm id is ...............");
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${listingId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch product. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data, "data................");
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [listingId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* First Grid: Image */}
        <div className="col-md-6">
          <img
            width={400}
            height={200}
            src={product.images[0]}
            alt={product.name}
            className="img-fluid"
          />
        </div>

        {/* Second Grid: Title, Price, and Description */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">$ {product.price}</p>
          <p>{product.description}</p>

          {/* Add to Cart Button */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => dispatch(addToCart(product))}
            style={{
              backgroundColor: "#007BFF",
              color: "#FFF",
            }}
          >
            <FaShoppingCart style={{ marginRight: "5px" }} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
