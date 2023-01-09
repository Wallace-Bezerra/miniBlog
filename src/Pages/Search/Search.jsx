import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
import { motion, AnimatePresence } from "framer-motion";
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
  return (
    <AnimatePresence>
      <motion.div
        className={styles.search}
        initial={{ opacity: 0, transition: { duration: 0.4 } }}
        animate={{
          opacity: 1,
          transition: { duration: 0.6 },
        }}
      >
        {posts && posts.length === 0 && (
          <div className={styles.notFoundSearch}>
            <div>
              <h1>Hum...</h1>
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
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9167 8H2"
                    stroke="#F0F9FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 15L1 8L8 1"
                    stroke="#F0F9FF"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>

              <h1>
                Resultados da busca por <span>{search}</span>{" "}
              </h1>
            </div>

            {posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
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
      </motion.div>
    </AnimatePresence>
  );
};
