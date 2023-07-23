import React, { useEffect, useState } from 'react';
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowOnLogin from '../hiddenLink/hiddenLink';
import { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyeRoute/AdminOnlyRoute';
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";


const logo = (
  <div className={styles.logo}>

    <Link to="/Contact"> <h2> e<span>Shop</span>   </h2></Link>

  </div>
);

const cart =
  (
    <span className={styles.cart}>
      <Link to="/cart">Carts <FaShoppingCart size={20} />
        <p>0</p>
      </Link>

    </span>
  );

const activeLink = ({ isActive }) =>
(
  (isActive ? `${styles.active}` : "")
)

const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setdisplayName] = useState("");
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const [scrollPage, setScrollPage] = useState(false);

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/Login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("a"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <header className={scrollPage ? `${styles.fixed}` : null} >
      <div className={styles.header}> {logo}
        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>

            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>


            <li>
              <AdminOnlyLink>
                <Link to="/admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>


            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activeLink}>Login</NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href="#home" style={{ color: "#ff7722" }}>
                  <FaUserCircle size={16} />
                  Hi, {displayName}
                </a>
              </ShowOnLogin>

              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>My Orders</NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" className={activeLink} onClick={logoutUser}>Logout</NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  )
}

export default Header;
