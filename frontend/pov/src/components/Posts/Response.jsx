const Response = ({ responses }) => {
  const { createdAt, text, user_photo } = responses;

  return (
    responses && (
      <>
        <img alt="user avatar" src={user_photo} className="w-[24px] rounded-full" />
        <p className="text-[12px] text-black">
          <span className="font-black">{createdAt} </span>
          {text}
        </p>
      </>
    )
  );
};

export default Response;
