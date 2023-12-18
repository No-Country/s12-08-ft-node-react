const SubscriptionCard = ({ subs }) => {
  console.log(subs);
  const { username, profile_picture } = subs.user;
  return (
    <article className="w-full p-2 flex gap-4 items-center">
      <div className="flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full">
        <div className="w-[48px] h-[48px] overflow-hidden rounded-full border-2 border-transparent">
          <img
            className="object-fill"
            src={profile_picture}
            alt={`avatar de ${username}`}
          />
        </div>
      </div>
      <div>
        <h3>{username}</h3>
      </div>
      <div></div>
    </article>
  );
};

export default SubscriptionCard;
