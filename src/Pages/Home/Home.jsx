import styles from "./Home.module.scss";
import { motion, AnimatePresence } from "framer-motion";
// hooks
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PostCard } from "../../components/PostCard/PostCard";
import { Modal } from "../../components/Modal/Modal";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
// import { MenuContext } from "../../context/MenuContext";
import { useMenuIsOpen } from "../../hooks/useMenuIsOpen";
import { PostCardSkeleton } from "../../components/PostCard/PostCardSkeleton";

export const Home = () => {
  const { menu } = useMenuIsOpen();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { documents: posts, error, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    if (search) {
      return navigate(`/search?q=${search}`);
    }
  };

  const handleChange = (e) => {
    menu.setMenuIsOpen(false);
    setSearch(e.target.value);
  };
  return (
    <AnimatePresence>
      {menu.ModalIsOpen && <Modal />}
      <motion.section
        className={styles.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, damping: 5 }}
      >
        <motion.div
          className={styles.topArea}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Veja os últimos posts da comunidade</h1>

          <form onSubmit={handleSubmit} className={styles.search}>
            <input
              type="text"
              value={search}
              placeholder="Busque por tags"
              onChange={handleChange}
              onFocus={() => {
                menu.setMenuIsOpen(false);
              }}
            />
            <button>
              <img src="/icon-search.svg" alt="" />
            </button>
          </form>
        </motion.div>
        {/* <PostCardSkeleton/> */}
        {posts ? (
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
          })
        ) : (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
        {/* {loading && <Loading />} */}
      </motion.section>
    </AnimatePresence>
  );
};
