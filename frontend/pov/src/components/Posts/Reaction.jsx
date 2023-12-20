import "./Reaction.css";

// Cada boton Reaction es capas de recibir el total de reactiones y enviar una reaccion por click
const Reaction = ({ reaction }) => {
  const { image, amount } = reaction;

  return (
    <button className="reactionBtn btn btn-xs bg-[#232322] rounded-xl">
      <span className="reactionBtn__emoji text-xs">{image}</span>
      <span className="text-white text-xs">{amount >= 0 ? amount : 0}</span>
    </button>
  );
};

export default Reaction;
