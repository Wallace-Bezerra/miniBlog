import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";
export const NotFound = () => {
  return (
    <div className={styles.notFound}>
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
    </div>
  );
};
