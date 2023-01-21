import { useParams } from "react-router-dom";
import styles from "./Post.module.scss";
// import { PostCard } from "../../components/PostCard/PostCard";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { PostDetail } from "../../components/PostDetail/PostDetail";
import { motion, AnimatePresence } from "framer-motion";

export const Post = () => {
  const { id } = useParams();
  const { document: post, error, loading } = useFetchDocument("posts", id);
  console.log(post);
  return (
    <AnimatePresence>
      <motion.div
        className={styles.home}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, damping: 5 }}
      >
        {post && (
          <PostDetail
            key={post.id}
            id={post.id}
            CreatedDate={post.createdDate}
            CreatedBy={post.createdBy}
            title={post.title}
            content={post.content}
            image={post.image}
            arrayTags={post.arrayTags}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
