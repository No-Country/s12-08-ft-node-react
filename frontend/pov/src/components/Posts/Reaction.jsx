import { useEffect } from "react";

// Cada boton Reaction es capas de recibir el total de reactiones y enviar una reaccion por click
const Reaction = ({ reaction }) => {
  //Aqui useState recibe las reacciones actuales
  const [counter, setCounter] = useState(10);

  return (
    <button className="btn btn-xs" onClick={plusOneReaction}>
      <span className="text-xs hover:scale-50">{emoticon}</span>
      <span className="font-black text-xs">{counter}</span>
    </button>
  );
};

export default Reaction;
