import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./SignUp.module.scss";
import { useMenuIsOpen } from "../../hooks/useMenuIsOpen";
// import patterns from "../../styles/patterns.module.scss";
export const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { menu } = useMenuIsOpen();
  const [error, setError] = useState("");
  const {
    auth,
    createUser,
    error: authError,
    setError: setAuthError,
    loading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAuthError("");

    const user = {
      displayName,
      email,
      password,
    };
    if (password !== confirmPassword) {
      setError("As senhas devem ser iguais!");
      return;
    }

    const response = await createUser(user);
    if (response === true) {
      alert("Cadastrado!", response.displayName);
    }
    menu.setModalIsOpen(true);

    console.log(response);
  };
  // console.log(patterns);
  return (
    <AnimatePresence>
      <motion.section
        className={styles.signUp}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, damping: 5 }}
      >
        <div className={styles.formSignUp}>
          <h1 className={styles.title}>Cadastre-se para postar</h1>
          <p className={styles.subtitle}>
            Crie sua conta e compartilhe suas historias faça seu cadastro para
            se conectar
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Nome</span>
              <input
                type="text"
                name="displayName"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
                required
                placeholder="Digite seu Nome"
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="Digite seu Email"
              />
            </label>
            <label>
              <span>Senha</span>
              <input
                type="password"
                name="password"
                style={{ border: error ? "solid 2px #f32222" : null }}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                placeholder="Digite uma Senha"
              />
            </label>
            <label>
              <span>Confirmar Senha</span>
              <input
                type="password"
                name="confirmPassword"
                style={{ border: error ? "solid 2px #f32222" : null }}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                placeholder="Confirme sua Senha"
              />
            </label>
            <button className={styles.btn} type="submit" disabled={loading}>
              {loading ? "Aguarde..." : "Cadastrar"}
            </button>
            {error && (
              <div className={styles.error}>
                <img src="/alert-octagon.svg" alt="icone de alerta" />
                <span>{error}</span>
              </div>
            )}
            {authError && (
              <div className={styles.error}>
                <img src="/alert-octagon.svg" alt="icone de alerta" />
                <span>{authError}</span>
              </div>
            )}
          </form>
        </div>

        <motion.div
          className={styles.imageSignUp}
          animate={{
            opacity: 1,
            y: [-30, 10, -30],
            transition: { type: "spring", duration: 8, repeat: Infinity },
          }}
        >
          <img src="/mockup.png" alt="" />
          {/* <div className={styles.iconBlue}>
          <img src="/Icon_blue.svg" alt="" />
        </div>
        <div className={styles.iconYellow}>
          <img src="/Icon_yellow.svg" alt="" />
        </div> */}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};
