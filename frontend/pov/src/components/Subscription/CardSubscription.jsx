import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const CardSubscription = ({ subscription }) => {
  const { image, name } = subscription;

  return (
    <div className="card text-neutral-content relative rounded-[20px] bg-slate-50">
      <div className="card-body items-center text-center relative">
        <div className="dropdown dropdown-end  right-0 top-0 absolute">
          {/* Option */}
          <label tabIndex={0} className="btn btn-ghost btn-circle  avatar">
            <svg
              width="20"
              height="8"
              viewBox="0 0 13 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="1.5"
                cy="1.5"
                r="1.5"
                transform="rotate(180 1.5 1.5)"
                fill="#2F2F2F"
              />
              <circle
                cx="6.5"
                cy="1.5"
                r="1.5"
                transform="rotate(180 6.5 1.5)"
                fill="#2F2F2F"
              />
              <circle
                cx="11.5"
                cy="1.5"
                r="1.5"
                transform="rotate(180 11.5 1.5)"
                fill="#2F2F2F"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 gap-4 shadow menu menu-sm dropdown-content items-center rounded-box w-32 text-black bg-white border border-black"
          >
            <li><Link className='text-center' to='/chats'>Ver perfil</Link></li>
            <li className='hover:cursor-pointer m-0 p-0 ' onClick={() => console.log('Te suscribiste')}>Suscribete</li>
          </ul>
        </div>
      </div>
      <div className="card-actions bg-[#949494] rounded-b-[20px] grid grid-rows-[auto,auto] gap-2 items-center">
        <div className="row-start-1 row-end-3">
          <div
            id="avatar"
            className="rounded-full overflow-hidden w-14 h-14 md:w-15 md:h-15 border-2 transform -translate-y-1/2 ml-4"
          >
            <img
              src={image}
              alt="Avatar"
              className="object-cover w-full h-full bg-slate-500"
            />
          </div>
        </div>
        <div className="row-start-3 col-span-full text-center flex items-center ml-5 mt-[-15px]">
          <div className="text-black ml-0 mt-[-25px]">{name}</div>
        </div>
      </div>
    </div>
  );
};

CardSubscription.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, // Ajusta las propiedades según tus necesidades
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CardSubscription;