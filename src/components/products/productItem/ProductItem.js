import React from 'react';
import styles from "./ProductItem.module.scss";
import Card from "../../card/Card";
import { Link } from 'react-router-dom';
import { ADD_TO_CART,  CALCULATE_TOTAL_QUANTITY, } from '../../../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const ProductItem = ({product, grid, id, name, price, desc, imageURL}) => {
 //console.log(product.desc);
  // const shortenText = (text, n) => {
  //   console.log("data of products" + text);
  //  // console.log("text length" + text);
  //   if (!text.length > n) {
  //     const shortenedText = text.substring(0, n).concat("...");
  //     return shortenedText;
  //   }
  //   return text;
  // };
  const dispatch = useDispatch();

 const addToCart = (product) => 
  {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }

  return (
    
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${product.id}`} >
      <div className={styles.img}>
        <img src={product.imageURL} alt="" />
      </div>
      <div className={styles.details}>
           <p>{`$${product.price}`}</p>
          <h4>{product.name.substring(0, 20)} {product.name.length >= 20 && '...'}</h4>
         <p className={styles.desc}>{product.desc.substring(0, 100)} {product.desc.length >= 100 && '...'}</p> 
          {!grid && <p className={styles.desc}>
          {product.desc.substring(0, 200)} {product.desc.length >= 200 && '...'}
            </p>}
        <button className="--btn --btn-danger" onClick={()=> addToCart(product)}>
          Add to Cart
        </button>   
        </div>
       
      </Link>
    </Card>
  )
}

export default ProductItem
