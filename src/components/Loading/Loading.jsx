import styles from "./Loading.module.scss";

export const Loading = () => {
    return <img className={styles.loading} src="./loading.svg" alt="loading..." />
}