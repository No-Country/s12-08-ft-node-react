const Response = ({ responses }) => {
  //const { avatar, username, message } = responses;
  return (
    responses && (
      <>
        <img src={avatar} alt="user avatar" className="w-[24px]" />
        <p className="text-[12px] text-black">
          <span className="font-black">{username}: </span>
          {message}
        </p>
      </>
    )
  );
};

export default Response;
