import { Link, useNavigate } from 'react-router-dom';
import Option from '../Svg/Option';
import SubsIcon from '../Svg/SubsIcon';

const CardSubscription = ({ data, isSubs, ValidateSubscription }) => {
  const { id, profile_picture, name, username, totalSubscriptions } =
    data.beneficiary;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/profile/${id}`);
  };

  const backgroundChat = {
    backgroundImage: `url(${data.chat[0].img})`,
    borderRadius: `15px 15px 0px 0px`,
  };

  return (
    <div className="card text-neutral-content relative rounded-[20px] bg-slate-50">
      <div
        className="card-body items-center text-center cursor-pointer"
        style={backgroundChat}
        onClick={handleNavigate}
      >
        {/* Menu ... */}
        <div className="dropdown dropdown-end right-0 top-0 absolute">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
            onClick={(e) => e.stopPropagation()}
          >
            <Option color="#fff" />
          </label>
          <ul
            tabIndex={0}
            className="z-[25] gap-4 menu menu-sm dropdown-content items-center rounded-box w-32 text-black bg-white shadow-md"
          >
            <li className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
              <Link to={`/profile/${id}`} onClick={(e) => e.stopPropagation()}>
                Ver perfil
              </Link>
            </li>
            {ValidateSubscription === false ? (
              <li className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
                <Link to={`/sub/${id}`} onClick={(e) => e.stopPropagation()}>
                  Ir al chat
                </Link>
              </li>
            ) : (
              <li className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
                <Link to={`/chats/${id}`} onClick={(e) => e.stopPropagation()}>
                  Ir al chat
                </Link>
              </li>
            )}
            <li className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
              <Link onClick={(e) => e.stopPropagation()}>Reportar</Link>
            </li>
            {isSubs ? (
              <li
                className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg"
                onClick={() => console.log('Te desuscribiste')}
              >
                <Link to="" onClick={() => stopPropagation()}>
                  Desuscribirse
                </Link>
              </li>
            ) : (
              <li className="w-full m-0 p-0 hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
                <Link to={`/sub/${id}`} onClick={() => stopPropagation()}>
                  Suscribirse
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div
        className="w-full flex justify-between card-actions bg-[#949494] rounded-b-[20px] cursor-pointer"
        onClick={handleNavigate}
      >
        {/* AVATAR and USERNAME */}
        <div className="w-full flex items-center justify-between">
          <Link
            to={`/profile/${id}`}
            id="avatar"
            className="w-[56px] h-[56px] md:w-15 md:h-15 ml-4 flex flex-col -translate-y-1/2 rounded-full overflow-hidden border-2"
            onClick={() => stopPropagation()}
          >
            <img
              src={profile_picture}
              alt={`avatar de ${username}`}
              className="w-[56px] h-[56px] object-cover"
            />
          </Link>
          <div className="text-white">@{name}</div>
          {/* Subs Counter */}
          <div className="mr-4 flex gap-2 items-center">
            <SubsIcon />
            <span className="text-white">{totalSubscriptions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSubscription;
