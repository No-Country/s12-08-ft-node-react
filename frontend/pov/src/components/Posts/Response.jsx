const Response = ({ response }) => {
  const { avatar, username, message } = response;
  return (
    <>
      <img src={avatar} alt="user avatar" className="w-[24px]" />
      <p className="text-[12px] text-black">
        <span className="font-black">{username}: </span>
        {message}
      </p>
    </>
  );
};

export default Response;
