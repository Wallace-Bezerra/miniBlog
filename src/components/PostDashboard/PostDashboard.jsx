import { Link } from "react-router-dom";
import styles from "./PostDashboard.module.scss";

export const PostDashboard = ({ title, image, id, deleteDocument }) => {
  return (
    <div className={styles.PostDashboard}>
      <div className={styles.ContentData}>
        <div className={styles.title}>
          <p>Titulo</p>
          <h2>{title}</h2>
        </div>

        <div className={styles.buttonActions}>
          <Link to={`/posts/edit/${id}`}>
            <img src="./Icon-edit.svg" alt="" />
          </Link>
          <Link
            onClick={() => {
              deleteDocument(id);
            }}
          >
            <img src="./Icon-delete.svg" alt="" />
          </Link>
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
