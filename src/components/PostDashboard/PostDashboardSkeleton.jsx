import { Link } from "react-router-dom";
import styles from "./PostDashboardSkeleton.module.scss";

export const PostDashboardSkeleton = () => {
  return (
    <div className={styles.PostDashboard}>
      <div className={styles.ContentData}>
        <div className={styles.title}>
          <p className={styles.skeleton}></p>
          <h2 className={styles.skeleton}></h2>
        </div>

        <div className={styles.buttonActions}>
          <Link>
            <span className={styles.skeleton}></span>
          </Link>
          <Link>
            <span className={styles.skeleton}></span>
          </Link>
        </div>
      </div>

      <div className={styles.image}>
        <Link>
          <span className={styles.skeleton}></span>
        </Link>
      </div>
    </div>
  );
};
