import { useEffect, useState } from "react";
import styles from "./EditPost.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user } = useAuthValue();
  const { id } = useParams();
  const {
    document: post,
    loading,
    error: errorPost,
  } = useFetchDocument("posts", id);
  console.log(post);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      const arrayString = post.arrayTags.join(", ");
      setTags(arrayString);
    }
  });

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
    <section className={styles.editPost}>
      <div className={styles.formEditPost}>
        <h1 className={styles.title}>Edite seu post aqui </h1>
        <p className={styles.subtitle}>
          Altere os dados deste post como desejar!
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
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
            <button
              className={styles.btn}
              type="submit"
              disabled={response.loading}
            >
              {response.loading ? "Aguarde..." : "Editar"}
            </button>
          </div>
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
          <div>
            <label>
              <span>Visualização da Imagem atual</span>
              <div className={styles.previewImage}>
                {post && <img src={post.image} alt="" />}
              </div>
            </label>
          </div>
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
