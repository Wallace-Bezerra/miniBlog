import { Link } from "react-router-dom";
import styles from "./PostDashboard.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export const PostDashboard = ({ title, image, id, deleteDocument }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.PostDashboard}
        layout
        key={id}
        initial={{ opacity: 0, transition: { duration: 0.4 } }}
        animate={{
          opacity: 1,
          transition: { duration: 0.6 },
        }}
        exit={{ opacity: 0, type: "spring", transition: { duration: 0.4 } }}
        // transition={{ duration: 0.4, damping: 5 }}
      >
        <div className={styles.ContentData}>
          <div className={styles.title}>
            <p>Titulo</p>
            <h2>{title}</h2>
          </div>

          <div className={styles.buttonActions}>
            <Link to={`/posts/edit/${id}`}>
              <motion.img
                src="./Icon-edit.svg"
                alt=""
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", duration: 0.6 },
                }}
              />
            </Link>
            <Link
              onClick={() => {
                deleteDocument(id);
              }}
            >
              <motion.img
                src="./Icon-delete.svg"
                alt=""
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", duration: 0.6 },
                }}
              />
            </Link>
          </div>
        </div>

        <div className={styles.image}>
          <Link to={`/posts/${id}`}>
            <motion.img
              src={image}
              alt=""
              initial={{ opacity: 0, transition: { duration: 0.4 } }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
            />
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
