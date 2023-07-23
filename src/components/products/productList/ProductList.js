import React, { useEffect, useState } from 'react';
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import Search from "../../search/Search";

import { FaListAlt } from "react-icons/fa";
import ProductItem from '../productItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilterProducts, SORT_PRODUCTS } from '../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';


const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const filterProducts = useSelector(selectFilterProducts);
  const [sort, setSort] = useState("latest");

  const dispatch = useDispatch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);


  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className={styles["product-list"]} id="products">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filterProducts.length}</b> Products found.
          </p>

        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />

        </div>

        {/* Sort Products */}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>

        {products.length === 0 ? (
          <p>No Products Found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              console.log("FilterProducts" + filterProducts);
              return (
                <div key={products.id}>
                  <ProductItem {...products} grid={grid} product={product} />
                </div>
              )
            })}
          </>
        )}

      </div>
      <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filterProducts.length}
        />
    </div>
  )
}

export default ProductList
