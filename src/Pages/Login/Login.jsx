import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./Login.module.scss";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    auth,
    login,
    error: authError,
    setError: setAuthError,
    loading,
  } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setAuthError("");

    const user = {
      email: email,
      password: password,
    };

    if (user.password.length < 6) {
      setError("A senha precisa conter pelo menos 6 caracteres");
      return;
    }
    const response = await login(user);
    console.log("login", response);
  };
  return (
    <section className={styles.login}>
      <div className={styles.formLogin}>
        <h1 className={styles.title}>Acessar minha conta </h1>
        <p className={styles.subtitle}>
          Basta realizar o login com seu email e senha.
        </p>
        <form onSubmit={handleSubmit}>
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
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Aguarde..." : "Entrar"}
          </button>
          {/* <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? "Aguarde..." : "Cadastrar"}
          </button> */}
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

          <div className={styles.singUpLink}>
            <p>
              Caso ainda não tenha uma conta conosco, é possível se cadastrar
              <Link to="/signup">Clicando aqui.</Link>
            </p>
          </div>
        </form>
      </div>
      <div className={styles.imageSignUp}>
        <img src="/imageSignUp.jpg" alt="" />
        {/* <div className={styles.iconBlue}>
          <img src="./Icon_blue.svg" alt="" />
        </div>
        <div className={styles.iconYellow}>
          <img src="./Icon_yellow.svg" alt="" />
        </div> */}
      </div>
    </section>
  );
};
