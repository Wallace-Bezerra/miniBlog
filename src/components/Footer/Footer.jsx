import styles from "./Footer.module.scss";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>2022 © MINIBLOG</p>
      </div>
    </footer>
  );
};
