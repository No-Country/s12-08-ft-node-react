import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ReactionCard = ({ emoji, reaction, count, handleEmoji, id , messageId , usersReacted, idUser}) =>{

  const ifUserReacted = () => {
    return usersReacted.some((user_reaction) => idUser === user_reaction.user_id && user_reaction.reaction === reaction)
  }

  return(
  <div className={`rounded-xl p-1 inline-flex items-center text-xs mr-1 hover:scale-[102%] transition-transform cursor-pointer ${
    ifUserReacted() ? 'bg-[#5D73E9]' : 'bg-[#1B1B1A]' 
    }`}
    onClick={(e) => messageId ? handleEmoji(e, reaction, id , messageId ,false) : handleEmoji(e, reaction, id ,false)}>
    <span className="mr-1">{emoji}</span>
    <span className="text-white mr-1">{count}</span>
  </div>
)};

function Reactions({ reactions, id, messageId, usersReacted, idUser, handleEmoji }) {
  const { reactionsDicc } = useContext(ChatContext);
  // Creo un arreglo iterable y lo recorto para quitarle (pero no eliminar) el ultimo elemento que no corresponde (users_who_reacted)
  const reactionMap = Object.entries(reactions).slice(
    0,
    Object.entries(reactions).length - 1
  );
  return (
    <div>
      {reactions ? (
        reactionMap.map(([reaction, count], index) => {
          if(count > 0){
          return(
          <ReactionCard
            key={index}
            emoji={reactionsDicc[reaction]}
            reaction={reaction}
            count={count >= 0 ? count : 0}
            handleEmoji={handleEmoji}
            id={id}
            usersReacted={usersReacted}
            idUser={idUser}
            messageId={messageId}
          />
        )}})
      ) : (
        <span>Reacciones</span>
      )}
    </div>
  );
}

export default Reactions;
