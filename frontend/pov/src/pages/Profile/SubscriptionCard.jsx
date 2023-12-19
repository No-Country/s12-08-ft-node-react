import NoAvatar from "../../components/Svg/NoAvatar";

const SubscriptionCard = ({ subs }) => {
  //console.log(subs);
  const { username, profile_picture, totalSubscriptions } = subs.beneficiary;
  return (
    <article className="w-full p-2 flex gap-4 items-center">
      <div className="flex justify-center items-center bg-gradient-to-b from-[#5D73E9] via-[#4C22B3] to-[#FF8600] rounded-full">
        <div className="w-[48px] h-[48px] overflow-hidden rounded-full border-2 border-transparent">
          {profile_picture ? (
            <img
              className="object-fill"
              src={profile_picture}
              alt={`avatar de ${username}`}
            />
          ) : (
            <NoAvatar />
          )}
        </div>
      </div>
      <div>
        <h3>{username}</h3>
        <p className="text-xs">
          {totalSubscriptions}
          <span> suscripciones</span>
        </p>
      </div>
      <div>{/* BOTON DE MENU */}</div>
    </article>
  );
};

export default SubscriptionCard;
