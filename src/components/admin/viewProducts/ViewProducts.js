/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import styles from "./ViewProducts.module.scss";
import { toast } from 'react-toastify';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../../../firebase/config';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from '../../loader/Loader';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from "notiflix";
import { useDispatch} from "react-redux";
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import {useSelector } from "react-redux";
import Search from "../../search/Search";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";


const ViewProducts = () => {

 // const [products, setProducts] = useState([]);
  const [ setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [search, setSearch] = useState("");
  const filterProducts = useSelector(selectFilterProducts);
  const {data, isLoading} = useFetchCollection("products");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);


  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );



  // useEffect(() => {
  //   getProducts();
  // },[])

  // const getProducts = () => 
  // {
  //   setIsLoading(true);

  //   try {
  //     const productsRef = collection(db,"products");
  //     const q = query(productsRef, orderBy("createdAt", "desc")) ;
  //     onSnapshot(q, (snapshot) => {
  //      // console.log(snapshot.docs);
  //      const allProdcuts = snapshot.docs.map((doc) => ({
  //         id:doc.id, 
  //         ...doc.data()
  //      }))
  //      setIsLoading(false);
  //      setProducts(allProdcuts);
  //      console.log(allProdcuts);
  //      dispatch(
  //       STORE_PRODUCTS({
  //         products:allProdcuts
  //       })
  //       );
  //     }) 

  //   }
  //   catch {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // }

  
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);
 
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct= async (id, imageURL) => 
  {
      try {
          await  deleteDoc(doc(db, "products", id));

          const storageRef = ref(storage, imageURL);
          await deleteObject(storageRef);
          toast.success("Product deleted successfully");

      }
      catch(error) 
      {
        toast.error(error.message);
      }
  }

  return (
   <> 
    {/* {isLoading && <Loader/>}  */}
    <div className={styles.table}>
    <Search value={search} onChange={(e) => setSearch(e.target.value)} />

      <h2>{}</h2>
      {filterProducts.length === 0 ? (<p>No products found</p>) :(
        <table>
          <thead>
          <tr>
            <th>S. No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>  
            </tr>
            </thead>
           {currentProducts.map((product, index) => {
              const {id, name, price, imageURL, category} = product;
              return (
                <tbody>
                <tr key={id}> 
                   <td> {index + 1}</td>
                   <td> <img src={imageURL} alt={name} style={{width:"100px"}} /></td>
                   <td> {name}</td>
                   <td> {category}</td>
                   <td> {`${price}`}</td>
                  <td className={styles.icons}> 
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color="green" /> &nbsp;
                     
                    </Link>
                    <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)} />
                  </td>
                  
                </tr>
                </tbody>
              )
           })}
         
        </table>
      )}
         <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filterProducts.length}
        />
    </div>
    </> 
  )
}

export default ViewProducts
