import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Vista Para configuracion de perfil</p>
      <button
        className="ml-8 mt-8 bg-black text-white p-2 rounded"
        onClick={() => navigate("/home")}
      >
        Volver al Home
      </button>
    </div>
  );
};

export default Profile;
