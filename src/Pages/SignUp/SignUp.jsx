import { async } from "@firebase/util";
import { useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./SignUp.module.scss";
// import patterns from "../../styles/patterns.module.scss";
export const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    console.log(user);

    const response = await createUser(user);
    console.log(response);
  };
  // console.log(patterns);
  return (
    <section className={styles.signUp}>
      <div className={styles.formSignUp}>
        <h1 className={styles.title}>Cadastre-se para postar</h1>
        <p className={styles.subtitle}>
          Crie sua conta e compartilhe suas historias faça seu cadastro para se
          conectar
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
          <button className={styles.btn} type="submit">
            Cadastrar
          </button>
          {error && (
            <div className={styles.error}>
              <img src="./alert-octagon.svg" alt="icone de alerta" />
              <span>{error}</span>
            </div>
          )}
          {authError && (
            <div className={styles.error}>
              <img src="./alert-octagon.svg" alt="icone de alerta" />
              <span>{authError}</span>
            </div>
          )}
        </form>
      </div>
      <div className={styles.imageSignUp}>
        <img src="/imageSignUp.jpg" alt="" />
        <div className={styles.iconBlue}>
          <img src="./Icon_blue.svg" alt="" />
        </div>
        <div className={styles.iconYellow}>
          <img src="./Icon_yellow.svg" alt="" />
        </div>
      </div>
    </section>
  );
};
