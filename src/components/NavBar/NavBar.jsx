import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
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

    // console.log(mediaQuery);
    // if (mediaQuery) {
    //   setMenuIsOpen(false);
    // }
  }, [window.innerWidth]);

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            Mini<span>Blog</span>
          </Link>
        </div>
        <ul className={`${styles.listNav} ${menuIsOpen ? styles.active : ""}`}>
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
        </ul>
        {console.log(styles)}
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
