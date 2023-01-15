import { Link } from "react-router-dom";
import styles from "./PostAbout.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export const PostAbout = ({ title, image, id, link }) => {
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
        exit={{
          opacity: 0,
          type: "spring",
          transition: { duration: 0.2 },
        }}
      >
        <div className={styles.ContentData}>
          <div className={styles.title}>
            <p>Tecnologia usada</p>
            <h2>{title}</h2>
          </div>

          <div className={styles.buttonActions}>
            <Link to={"/dashboard"}>
              <motion.img
                src="./Icon-edit.svg"
                alt=""
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", duration: 0.6 },
                }}
              />
            </Link>
            <Link to={"/dashboard"}>
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
          <a href={link} target="_blank">
            <motion.img
              src={image}
              alt=""
              initial={{ opacity: 0, transition: { duration: 0.4 } }}
              animate={{ opacity: 1, transition: { duration: 0.4 } }}
            />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
