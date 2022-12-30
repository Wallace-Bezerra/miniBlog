import { Link } from "react-router-dom";
import styles from "./PostDetail.module.scss";

export const PostDetail = ({
  CreatedDate,
  CreatedBy,
  content,
  image,
  title,
  arrayTags,
  id,
}) => {
  return (
    <div className={styles.postDetail}>
      <div className={styles.topPost}>
        <div className={styles.userInfoPost}>
          <span className={styles.userNamePost}>{CreatedBy} </span>
          <span className={styles.userDatePost}>
            {CreatedDate.formatedDate}
          </span>
          <span className={styles.userDateDetails}>
            {CreatedDate.dateDifference}
          </span>
          <span className={styles.userDateHoursPost}>
            {CreatedDate.formatedDateHours}
          </span>
        </div>
        <h2>{title}</h2>
      </div>
      <div className={styles.contentPost}>
        <p>{content}</p>
        <img src={image} alt="" />
      </div>
      <div className={styles.footerPost}>
        <div className={styles.tagsPost}>
          <p>Tags relacionadas a este post</p>
          <div className={styles.tagContentPost}>
            {arrayTags.map((tag) => {
              return <span key={`${id} ${tag}`}># {tag}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
