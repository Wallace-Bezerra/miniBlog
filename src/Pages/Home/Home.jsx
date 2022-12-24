import styles from "./Home.module.scss";

// hooks
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { doc } from "firebase/firestore";

export const Home = () => {
  const { documents: posts, error, loading } = useFetchDocument("posts");
  console.log(posts);
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <p>ESTA É A PAGINA PRINCIPAL</p>
      <form>
        <input type="text" placeholder="Busque por tags..." />
        <button>Pesquisar</button>
      </form>
      {posts &&
        posts.map((post) => {
          // console.log(post.CreatedAt.toDate());
          return (
            <PostCard
              key={post.id}
              CreatedDate={post.createdDate}
              CreatedBy={post.createdBy}
              title={post.title}
              content={post.content}
              image={post.image}
              arrayTags={post.arrayTags}
            />
          );
        })}
    </div>
  );
};
