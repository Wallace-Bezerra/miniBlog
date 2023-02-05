import { Link } from "react-router-dom";
import styles from "./PostCardSkeleton.module.scss";

export const PostCardSkeleton = ({}) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.topPost}>
        <div className={styles.userInfoPost}>
          <span className={`${styles.userNamePost} ${styles.skeleton}`}> </span>
          <span className={`${styles.userDatePost}  ${styles.skeleton}`}></span>
          <span className={styles.userDateDetails}></span>
          <span className={styles.userDateHoursPost}></span>
        </div>
        <h2 className={styles.skeleton}></h2>
      </div>
      <div className={styles.contentPost}>
        <p className={styles.skeleton}></p>
        <p className={styles.skeleton}></p>
        <p className={styles.skeleton}></p>
        <div className={`${styles.image} ${styles.skeleton}`}></div>
      </div>
      <div className={styles.footerPost}>
        <div className={styles.tagsPost}>
          <p className={styles.skeleton}></p>
          <div className={`${styles.tagContentPost} ${styles.skeleton}`}></div>
        </div>
        <Link>
          <button
            className={`${styles.btn} ${styles.view} ${styles.skeleton}`}
          ></button>
        </Link>
      </div>
    </div>
  );
};
