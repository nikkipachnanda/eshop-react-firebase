import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   message: Yup.string().required('Message is required'),
  // });

  // const formOptions = { resolver: yupResolver(validationSchema) };

  const form = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const submitReview = (data) => {
    // e.preventDefault();
    console.log(data);
    let review = data.review;
    let rate = data.rate;
    console.log("rating is" + rate);
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),

    };
    console.log("review value" + reviewConfig.review);
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={handleSubmit(submitReview)}>
            <label>Rating:</label>
            <StarsRating
              // value={rate}
              name="rate"
              onChange={(rate) => {
                setRate(rate);
              }}
              {...register('rate', { required: true, value : 1})} 
            />

            <div className={styles.danger}>
              {errors.rate && errors.rate.type === "required" && (
                <span role="alert">This is required</span>
              )}
            </div>
            <label>Review</label>
            <textarea
              //setValue={review}
              name="review"
              // required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
              {...register('review', { required: true, maxLength: 30 })}
            ></textarea>
            <div className={styles.danger}>
              {errors.review && errors.review.type === "required" && (
                <span role="alert">This is required</span>
              )}
            </div>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
