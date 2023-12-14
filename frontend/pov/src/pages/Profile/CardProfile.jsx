//import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscriptions } from "../../slices/subscriptionsSlice";
import { useEffect } from "react";

const CardProfile = () => {
  // obtencion del las subcriciones
  const dispatch = useDispatch();
  const { subscriptions, status, error } = useSelector(
    (state) => state.subscriptions
  );

  useEffect(() => {
    const fetchSubscriptionsIfNeeded = async () => {
      if (status === "idle") {
        await dispatch(fetchSubscriptions());
      }
    };

    fetchSubscriptionsIfNeeded();
  }, [dispatch, status]);

  const getErrorMessage = () => {
    let errorMessage = "Error al cargar suscripciones.";

    if (error.response) {
      errorMessage = `Error del servidor: ${error.response.status} - ${error.response.data.message}`;
    } else if (error.request) {
      errorMessage = "Error de red: No se recibió respuesta del servidor.";
    }

    return errorMessage;
  };

  if (status === "loading") {
    return <p>Cargando suscripciones...</p>;
  }

  if (status === "failed") {
    return <p>{getErrorMessage()}</p>;
  }

  if (status === "succeeded" && subscriptions.length === 0) {
    return <p>No hay suscripciones disponibles.</p>;
  }
  return (
    <div className="card-profile">
      <img src="" alt="" className="profile-avatar" />
      <div className="profile-details">
        <h2>{}</h2>

        <div className="profile-stats">
          <span>Suscriptores</span>
        </div>
      </div>
    </div>
  );
};

// CardProfile.propTypes = {
//   name: PropTypes.string.isRequired,
//   avatar: PropTypes.string.isRequired,
//   subscribtores: PropTypes.number.isRequired,
// };

export default CardProfile;
