const Response = ({ responses }) => {
  const { createdAt, text } = responses;
  
  return (
    responses && (
      <>
        <img alt="user avatar" className="w-[24px]" />
        <p className="text-[12px] text-black">
          <span className="font-black">{createdAt} </span>
          {text}
        </p>
      </>
    )
  );
};

export default Response;
