import styles from "./Error.module.scss";

export const Error = ({ error }) => {
  return (
    <div className={styles.error}>
      <img src="/alert-octagon.svg" alt="icone de alerta" />
      <span>{error}</span>
    </div>
  );
};
