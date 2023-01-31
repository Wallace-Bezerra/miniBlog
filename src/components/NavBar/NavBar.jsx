import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NavBar.module.scss";
import { useAppContext } from "../../hooks/useAppContext";

export const NavBar = () => {
  const { app } = useAppContext();
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  useEffect(() => {
    window.addEventListener("resize", updateScreen);
    function updateScreen() {
      if (window.innerWidth > 1080) {
        app.setMenuIsOpen(false);
      }
    }
    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, [window.innerWidth]);

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            Mini<span>Blog</span>
          </Link>
        </div>
        <AnimatePresence>
          <motion.ul
            className={`${styles.listNav} ${app.menuIsOpen ? styles.active : ""
              }`}
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
        <div className={styles.mobile}>
          <img
            src="./Icon-mobile.svg"
            alt=""
            onClick={() => {
              app.setMenuIsOpen(!app.menuIsOpen);
            }}
          />
        </div>
      </nav>
    </header>
  );
};
