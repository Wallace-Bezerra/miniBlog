import { useState } from "react";
import styles from "./CreatePost.module.scss";

import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    //validar url da imagem

    try {
      new URL(image);
    } catch (error) {
      setError("A imagem precisa ser uma url");
      return;
    }

    // criar array de tags

    const arrayTags = tags.split(",").map((tag) => {
      return tag.trim().toLowerCase();
    });

    // checar campos
    if (!title || !image || !tags || !content) {
      setError("Insira os todos os dados");
    }

    //redirect home page
    navigate("/");

    console.log(response);
    insertDocument({
      title,
      image,
      arrayTags,
      content,
      uid: user.uid,
      createdBy: user.displayName,
    });
  };
  return (
    <section className={styles.createPost}>
      <div className={styles.formCreatePost}>
        <h1 className={styles.title}>Faça uma postagem </h1>
        <p className={styles.subtitle}>
          Escreva o que quiser e compartilhe suas ideias!
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            <span>Titulo</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              placeholder="Adicionar titulo"
            />
          </label>
          <label>
            <span>Imagem</span>
            <input
              type="text"
              name="image"
              // style={{ border: error ? "solid 2px #f32222" : null }}
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              required
              placeholder="Adicionar imagem"
            />
          </label>
          <label>
            <span>Tags</span>
            <input
              type="text"
              name="tags"
              // style={{ border: error ? "solid 2px #f32222" : null }}
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
              required
              placeholder="Adicione tags"
            />
          </label>
          <label>
            <span>Conteudo</span>
            {/* <input
              type="password"
              name="tags"
              // style={{ border: error ? "solid 2px #f32222" : null }}
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
              required
              placeholder="Adicione tags"
            /> */}
            <textarea
              name="content"
              cols="30"
              rows="10"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
              placeholder="Escreva seu conteúdo aqui !"
            ></textarea>
          </label>
          {/* <button className={styles.btn}>Postar</button> */}
          <button
            className={styles.btn}
            type="submit"
            disabled={response.loading}
          >
            {response.loading ? "Aguarde..." : "Postar"}
          </button>
          {response.error && (
            <div className={styles.error}>
              <img src="/alert-octagon.svg" alt="icone de alerta" />
              <span>{response.error}</span>
            </div>
          )}
          {error && (
            <div className={styles.error}>
              <img src="/alert-octagon.svg" alt="icone de alerta" />
              <span>{error}</span>
            </div>
          )}
          {/* {authError && (
            <div className={styles.error}>
              <img src="./alert-octagon.svg" alt="icone de alerta" />
              <span>{authError}</span>
            </div>
          )} */}
        </form>
      </div>
    </section>
  );
};
