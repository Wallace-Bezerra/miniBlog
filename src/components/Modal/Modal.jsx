import { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { useMenuIsOpen } from "../../hooks/useMenuIsOpen";
import styles from "./Modal.module.scss";

export const Modal = () => {
  const { menu } = useMenuIsOpen();
  const authUser = useAuthValue();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img
          src="./closedModal.svg"
          alt="Icone Closed"
          onClick={() => {
            menu.setModalIsOpen(!menu.ModalIsOpen);
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
