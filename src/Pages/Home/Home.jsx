import styles from "./Home.module.scss";

// hooks
import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { doc } from "firebase/firestore";

export const Home = () => {
  const [search, setSearch] = useState(null);
  const navigate = useNavigate();
  const { documents: posts, error, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    if (search) {
      return navigate(`/search?q=${search}`);
    }
  };
  console.log(posts);
  return (
    <div className={styles.home}>
      <div className={styles.topArea}>
        <h1>Veja os últimos posts da comunidade</h1>
        <form onSubmit={handleSubmit} className={styles.search}>
          <input
            type="text"
            value={search}
            placeholder="Busque por tags"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button>
            <img src="/icon-search.svg" alt="" />
          </button>
        </form>
      </div>
      {posts &&
        posts.map((post) => {
          // console.log(post.CreatedAt.toDate());
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
    </div>
  );
};
