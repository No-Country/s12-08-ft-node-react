import Post from "./Post";
// POSTLIST toma los posts que es un array de objetos post y los lista.-
const PostList = ({ posts = [] }) => {
  return (
    <section>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </section>
  );
};

export default PostList;
