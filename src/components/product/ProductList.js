import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../stores/slices/productSlice";
import Product from "./Product";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list); // Access products from the Redux store

  useEffect(() => {
    // Dispatch the fetchProducts action
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="row justify-content-center">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-md-3">
            <Product {...product} />
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center p-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <Link to='' className="page-link" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <Link to='' className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Link>
            </li>
          ))}
          <li className={`page-item ${currentPage === Math.ceil(products.length / itemsPerPage) ? 'disabled' : ''}`}>
            <Link to='' className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
