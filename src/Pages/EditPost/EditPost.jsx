import styles from "./EditPost.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useAppContext } from "../../hooks/useAppContext";
import { Error } from "../../components/Error/Error";

export const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { app } = useAppContext();
  const { user } = useAuthValue();
  const { id } = useParams();
  const {
    document: post,
    loading,
    error: errorPost,
  } = useFetchDocument("posts", id);
  // console.log(post);
  const handleMenuIsOpen = () => {
    app.setMenuIsOpen(false);
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      const arrayString = post.arrayTags.join(", ");
      setTags(arrayString);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    //validar url da imagem

    try {
      new URL(image);
      // criar array de tags

      const arrayTags = tags.split(",").map((tag) => {
        return tag.trim().toLowerCase();
      });

      // console.log(response);
      updateDocument(
        {
          title,
          image,
          arrayTags,
          content,
          uid: user.uid,
          createdBy: user.displayName,
        },
        id
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError("A imagem precisa ser uma url");
      return;
    }
    // checar campos
    if (!title || !image || !tags || !content) {
      setError("Insira os todos os dados");
    }
  };
  return (
    <section className={styles.editPost}>
      <div className={styles.formEditPost}>
        <div className={styles.formInfo}>
          <h1 className={styles.title}>Edite seu post aqui </h1>
          <p className={styles.subtitle}>
            Altere os dados deste post como desejar!
          </p>
        </div>

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
                onFocus={handleMenuIsOpen}
                required
                placeholder="Adicionar titulo"
              />
            </label>
            <label>
              <span>Imagem</span>
              <input
                type="text"
                name="image"
                style={{ border: error ? "solid 2px #f32222" : null }}
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                onFocus={handleMenuIsOpen}
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
                onFocus={handleMenuIsOpen}
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
                onFocus={handleMenuIsOpen}
                required
                placeholder="Escreva seu conteúdo aqui !"
              ></textarea>
            </label>
            {response.error && (
              <Error error={response.error} />
            )}
            {error && (
              <Error error={error} />
            )}
            <button
              className={styles.btn}
              type="submit"
              disabled={response.loading}
            >
              {response.loading ? "Aguarde..." : "Salvar"}
            </button>
          </div>

          <div>
            <label>
              <span>Visualização da Imagem atual</span>
              <div className={styles.previewImage}>
                {post && <img src={post.image} alt="" />}
              </div>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
};
