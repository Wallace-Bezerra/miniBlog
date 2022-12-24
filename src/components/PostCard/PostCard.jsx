import styles from "./PostCard.module.scss";

export const PostCard = ({
  CreatedDate,
  CreatedBy,
  content,
  image,
  title,
  arrayTags,
  uid,
}) => {
  return (
    <div className={styles.postCard}>
      <div className={styles.topPost}>
        <div className={styles.userInfoPost}>
          <span className={styles.userNamePost}>{CreatedBy} </span>
          <span className={styles.userDatePost}>
            {CreatedDate.formatedDate}
          </span>
          <span className={styles.userDateDetails}>{CreatedDate.dateDifference}</span>
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
          <p>Tags</p>
          <div className={styles.tagContentPost}>
            {arrayTags.map((tag) => {
              return <span key={`${uid} ${tag}`}># {tag}</span>;
            })}
          </div>
        </div>
        <button className={`${styles.btn} ${styles.view}`}>Ver</button>
      </div>
    </div>
  );
};
