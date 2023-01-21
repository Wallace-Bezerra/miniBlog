import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./NotFound.module.scss";
export const NotFound = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.notFound}
        initial={{ opacity: 0, transition: { duration: 0.4 } }}
        animate={{
          opacity: 1,
          transition: { duration: 0.6 },
        }}
      >
        <div className={styles.infoText}>
          <h1>404</h1>
          <h3>Ooops !</h3>
          <p>Esta pagina não foi encontrada...</p>

          <Link to="/">
            <button className={styles.btn}>Voltar</button>
          </Link>
        </div>
        <div className={styles.box}>
          <img src="/Box.svg" alt="Ilustração NotFound" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
