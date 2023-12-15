import Post from './Post';

const PostList = ({ chat, user, toggleModal }) => {
  const { profile_picture } = user;
  return (
    <section className="w-full max-w-[780px] mx-auto py-4 flex flex-col gap-4 px-[16px]">
      {chat?.map((message) => (
          <Post
            key={message._id}
            post={message}
            userName={name}
            userAvatar={profile_picture}
            toggleModal={toggleModal}
          />
      ))}
    </section>
  );
};

export default PostList;
