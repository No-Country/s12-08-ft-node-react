import PropTypes from 'prop-types';
import './CardSubscription.css'

const CardSubscription = ({ subscription }) => {
  const { title, description, image, name } = subscription;

  return (
    <div className="card  bg-white text-neutral-content ">
      <div className="card-body items-center text-center relative">
        <h4 className="card-title text-xl">{title}</h4>
        <p className="text-sm text-black">{description}</p>
        <div className="bg-subscription-top md:bg-subscription-middle h-40 md:h-70 absolute w-full"></div>
      </div>
      <div className="card-actions bg-gray-500 grid grid-rows-[auto,auto] gap-2 items-center">
        <div className="row-start-1 row-end-3">
          <div
            id="avatar"
            className="rounded-full overflow-hidden w-14 h-14 md:w-15 md:h-15 border-2 transform -translate-y-1/2 ml-4"
          >
            <img
              src={image}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="row-start-3 col-span-full text-center flex items-center ml-5 mt-[-15px]">
          <div className="text-white ml-0 mt-[-25px]">{name}</div>
        </div>
      </div>
    </div>
  );
};

CardSubscription.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired,
  }).isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default CardSubscription;
