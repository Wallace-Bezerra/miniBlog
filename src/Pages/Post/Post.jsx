import { useParams } from "react-router-dom";
import styles from "./Post.module.scss";
// import { PostCard } from "../../components/PostCard/PostCard";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { PostDetail } from "../../components/PostDetail/PostDetail";

export const Post = () => {
  const { id } = useParams();
  const { document: post, error, loading } = useFetchDocument("posts", id);
  console.log(post);
  return (
    <div>
      {loading && <p>LOADING.........</p>}
      {/* <h1>Post</h1> */}
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
    </div>
  );
};
