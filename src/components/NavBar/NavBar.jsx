import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <p>
          Mini<span>Blog</span>
        </p>
      </div>
      <ul className={styles.listNav}>
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
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? styles.active : null)}
          >
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
