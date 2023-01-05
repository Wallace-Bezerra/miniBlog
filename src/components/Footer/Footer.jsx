import styles from "./Footer.module.scss";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>{new Date().getFullYear()} © MINIBLOG</p>
      </div>
    </footer>
  );
};
