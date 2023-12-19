const reactionsDicc = {
  like: "👍",
  dislike: "👎",
  fun: "😂",
  love: "😍",
  sad: "😢",
  interesting: "😲",
  dead: "💀",
  hate: "🤬",
};

const ReactionCard = ({ reaction, count }) => (
  <div className="bg-black rounded-xl p-1 inline-flex items-center text-xs m-1">
    <span className="mr-2">{reaction}</span>
    <span className="text-white">{count}</span>
  </div>
);

function Reactions({ reactions }) {
  // Creo un arreglo iterable y lo recorto para quitarle (pero no eliminar) el ultimo elemento que no corresponde (users_who_reacted)
  const reactionMap = Object.entries(reactions).slice(
    0,
    Object.entries(reactions).length - 1
  );
  return (
    <div>
      {reactions ? (
        reactionMap.map(([reaction, count]) => (
          <ReactionCard
            key={reaction}
            reaction={reactionsDicc[reaction]}
            count={count}
          />
        ))
      ) : (
        <span>Reacciones</span>
      )}
    </div>
  );
}

export default Reactions;
