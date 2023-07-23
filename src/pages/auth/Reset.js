import React, { useState } from 'react'
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from '../../components/card/Card';
import resetImg from "../../assets/forgot.png";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email for a reset link");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}

      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input type='text' placeholder='email' required value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="--btn --btn-primary --btn-block" onClick={resetPassword}>Reset Password</button>

              <div className={styles.Links}>
                <p> <Link to="/Login">Login</Link>
                </p>
                <p><Link to="/Login">Register</Link>
                </p>
              </div>
            </form>


          </div>
        </Card>
      </section>
    </>
  )
}

export default Reset
