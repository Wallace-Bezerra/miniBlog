import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
import { PostCard } from "../../components/PostCard/PostCard";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

export const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments("posts", search);
  // console.log(posts, "testeee");
  return (
    <div className={styles.search}>
      {posts && posts.length === 0 && (
        <div className={styles.notFoundSearch}>
          <div>
            <p>A busca deste post não foi encontrada...</p>

            <Link to="/">
              <button className={styles.btn}>Voltar</button>
            </Link>
          </div>
          <div>
            <img src="/NotFound.svg" alt="Ilustração NotFound" />
          </div>
        </div>
      )}
      {posts && posts.length > 0 && (
        <>
          <div className={styles.resultSearch}>
            <Link to="/">
              <img src="/Icon-ArrowLeft.svg" alt="Icone de voltar" />
            </Link>

            <h1>
              Resultados da busca por <span>{search}</span>{" "}
            </h1>
          </div>

          {posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                uid={post.id}
                CreatedDate={post.createdDate}
                CreatedBy={post.createdBy}
                title={post.title}
                content={post.content}
                image={post.image}
                arrayTags={post.arrayTags}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
