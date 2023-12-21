const SubscriptionsList = ({ children }) => {
  return (
    <section>
      <h2 className="mb-8 text[20px] font-bold">Panel de Subscripciones</h2>
      <ul className="overflow-auto">{children}</ul>
    </section>
  );
};

export default SubscriptionsList;
