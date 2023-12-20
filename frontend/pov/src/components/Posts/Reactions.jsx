import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ReactionCard = ({ emoji, reaction, count, handleEmoji, id}) =>(
  <div className="bg-black rounded-xl p-1 inline-flex items-center text-xs mr-1 hover:scale-[102%] transition-transform cursor-pointer" onClick={(e) => handleEmoji(e, reaction, id ,false)}>
    <span className="mr-1">{emoji}</span>
    <span className="text-white mr-1">{count}</span>
  </div>
);

function Reactions({ reactions, id }) {
  const { reactionsDicc, handleEmoji } = useContext(ChatContext);
  // Creo un arreglo iterable y lo recorto para quitarle (pero no eliminar) el ultimo elemento que no corresponde (users_who_reacted)
  const reactionMap = Object.entries(reactions).slice(
    0,
    Object.entries(reactions).length - 1
  );
  return (
    <div>
      {reactions ? (
        reactionMap.map(([reaction, count], index) => (
          <ReactionCard
            key={index}
            emoji={reactionsDicc[reaction]}
            reaction={reaction}
            count={count >= 0 ? count : 0}
            handleEmoji={handleEmoji}
            id={id}
          />
        ))
      ) : (
        <span>Reacciones</span>
      )}
    </div>
  );
}

export default Reactions;
