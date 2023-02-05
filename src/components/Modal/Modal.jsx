import { useAuthValue } from "../../context/AuthContext";
import { useAppContext } from "../../hooks/useAppContext";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const { app } = useAppContext();
  const authUser = useAuthValue();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          src="/closedModal.svg"
          alt="Icone Closed"
          onClick={() => {
            app.setModalIsOpen(!app.ModalIsOpen);
          }}
        />
        <h2>Cadastrado com sucesso!</h2>
        <p>
          Usuário:
          <span> {authUser.user.displayName}</span>
        </p>
      </div>
    </div>
  );
};
