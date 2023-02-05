import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { PostDashboard } from "../../components/PostDashboard/PostDashboard";
import { PostDashboardSkeleton } from "../../components/PostDashboard/PostDashboardSkeleton";
import { motion } from "framer-motion";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");

  return (
    <div className={styles.dashboard}>
      <h1>Gerencie seus Posts</h1>
      <div className={styles.PostDashboardContent}>
        {loading && posts?.length > 0 && (
          <>
            <PostDashboardSkeleton />
            <PostDashboardSkeleton />
            <PostDashboardSkeleton />
          </>
        )}
        {!loading &&
          posts?.map((post) => {
            return (
              <PostDashboard
                key={post.id}
                title={post.title}
                image={post.image}
                id={post.id}
                deleteDocument={deleteDocument}
              />
            );
          })}
      </div>

      {posts && posts.length == 0 && (
        <>
          <motion.div
            className={styles.dashboardNoPosts}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, damping: 5 }}
          >
            <div className={styles.leftArea}>
              <h2>Começe agora mesmo</h2>
              <p>Não foram encontros posts, crie um novo post agora </p>
              <Link to="/posts/create">
                <button className={styles.btn}>Criar Post</button>
              </Link>
              <img src="/GroupPost.jpg" alt="" />
            </div>

            <div className={styles.image}>
              <img src="./CreatePost.svg" alt="" />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};
