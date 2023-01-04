import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { PostDashboard } from "../../components/PostDashboard/PostDashboard";

export const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const {
    documents: posts,
    error,
    loading,
  } = useFetchDocuments("posts", null, uid);
  const { deleteDocument, response } = useDeleteDocument("posts");
  // const posts = [];
  console.log(uid);
  return (
    <div className={styles.dashboard}>
      {posts && posts.length > 0 && (
        <>
          <h1>Gerencie seus Posts</h1>
          <div className={styles.PostDashboardContent}>
            {posts.map((post) => {
              return <PostDashboard title={post.title} image={post.image} id={post.id} deleteDocument={deleteDocument}/>
            })}
          </div>
        </>
      )}

      {posts && posts.length == 0 && (
        <>
          <div className={styles.dashboardNoPosts}>
            <div>
              <h1>Gerencie seus Posts</h1>
              <p>Não foram encontros posts, crie um novo post agora </p>
              <Link to="/posts/create">
                <button className={styles.btn}>Criar Post</button>
              </Link>
            </div>

            <div>
              <img src="./CreatePost.svg" alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
