import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NavBar.module.scss";

export const NavBar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { logout } = useAuthentication();
  const { user } = useAuthValue();
  useEffect(() => {
    console.log(menuIsOpen);
  }, [menuIsOpen]);

  useEffect(() => {
    // let mediaQuery = window.matchMedia("(min-width: 1080px)");
    window.addEventListener("resize", updateScreen);

    function updateScreen() {
      // console.log("resized to: ", window.innerWidth);
      if (window.innerWidth > 1080) {
        setMenuIsOpen(false);
      }
    }
    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, [window.innerWidth]);

  const listVariant = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.05,
        staggerChildren: 0.05,
      }
    },
    closed: {
      clipPath: "inset(10% 50% 90% 50% round 30px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.6,
        delay: 0.5,
      }
    }
  }
  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            Mini<span>Blog</span>
          </Link>
        </div>
        <AnimatePresence>
          <motion.ul className={`${styles.listNav} ${menuIsOpen ? styles.active : ""}`}
            // variants={listVariant}
            initial={false}
            key="menu"
            animate={{ opacity: 1, transition: { duration: 0.8 } }}
            exit={{ opacity: 0 }}
          >
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : null)}
              >
                Sobre
              </NavLink>
            </li>
            {!user && (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : null
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? styles.active : null
                    }
                  >
                    Cadastrar
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? styles.active : null
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/posts/create"
                    className={({ isActive }) =>
                      isActive ? styles.active : null
                    }
                  >
                    Novo Post
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    logout();
                  }}
                >
                  Sair
                </Link>
              </li>
            )}
          </motion.ul>
        </AnimatePresence>
        {/* <div className={`${styles.mobile} ${!isOpen ? styles.active : null}`}>
          <img */}
        <div className={styles.mobile}>
          <img
            src="./Icon-mobile.svg"
            alt=""
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
          />
        </div>
      </nav>
    </header>
  );
};
