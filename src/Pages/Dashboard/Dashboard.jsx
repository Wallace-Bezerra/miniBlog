import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";
// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { PostDashboard } from "../../components/PostDashboard/PostDashboard";
import { PostDashboardSkeleton } from "../../components/PostDashboard/PostDashboardSkeleton";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");
  console.log(uid);
  return (
    <div className={styles.dashboard}>
      <h1>Gerencie seus Posts</h1>
      {/* {loading && <PostDashboardSkeleton />} */}
      <div className={styles.PostDashboardContent}>
        {posts ? (
          <>
            {posts.map((post) => {
              return (
                <PostDashboard
                  title={post.title}
                  image={post.image}
                  id={post.id}
                  deleteDocument={deleteDocument}
                />
              );
            })}
          </>
        ) : (
          <>
            <PostDashboardSkeleton />
            <PostDashboardSkeleton />
            <PostDashboardSkeleton />
          </>
        )}
      </div>

      {posts && posts.length == 0 && (
        <>
          <div className={styles.dashboardNoPosts}>
            <div>
              <p>Não foram encontros posts, crie um novo post agora </p>
              <Link to="/posts/create">
                <button className={styles.btn}>Criar Post</button>
              </Link>
            </div>

            <div className={styles.image}>
              <img src="./CreatePost.svg" alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
