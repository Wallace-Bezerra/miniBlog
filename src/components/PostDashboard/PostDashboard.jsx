import { Link } from "react-router-dom";
import styles from "./PostDashboard.module.scss";

export const PostDashboard = ({ title, image, id }) => {
  return (
    <div className={styles.PostDashboard}>
      <div className={styles.ContentData}>
        <div className={styles.title}>
          <p>Titulo</p>
          <h2>{title}</h2>
        </div>

        <div className={styles.buttonActions}>
          <a href="">
            <img src="./Icon-edit.svg" alt="" />
          </a>
          <a href="">
            <img src="./Icon-delete.svg" alt="" />
          </a>
        </div>
      </div>

      <div className={styles.image}>
        <Link to={`/posts/${id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
    </div>
  );
};
