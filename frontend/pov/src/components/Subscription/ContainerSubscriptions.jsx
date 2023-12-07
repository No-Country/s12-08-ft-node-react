import CardSubscription from "./CardSubscription";
import { useSelector } from "react-redux";
import "./ContainerSubscriptions.css";

const ContainerSubscriptions = () => {
  const token = useSelector((state) => {
    return state.login.token;
  });

  const subscriptions = [
    {
      id: 1,
      name: "john wick",
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fa85bab7-c56d-4219-9286-09fafbde5c21/dfc8yf5-bc37b0a7-e2e5-4e70-bc53-c291ea22f83f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhODViYWI3LWM1NmQtNDIxOS05Mjg2LTA5ZmFmYmRlNWMyMVwvZGZjOHlmNS1iYzM3YjBhNy1lMmU1LTRlNzAtYmM1My1jMjkxZWEyMmY4M2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.30jhKrNIipSLa08HAK6CI3YzFsm-FnMobivZOIrF80I",
      price: 9.99,
    },
    {
      id: 2,
      name: "Emanuel Valente",
      image: "https://avatars.githubusercontent.com/u/98049322?v=4",
      price: 4.99,
    },
    {
      id: 3,
      name: "Lionel Messi",
      image: "https://cdn.futbin.com/content/fifa24/img/players/158023.png",
      price: 2.99,
    },
    {
      id: 4,
      name: "Mirgely Serrano",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQebFNS54HwIBECWfd4B3T5mNEKfddSuagJK8iJl8gbFeyaVh0-SM-X05SOq5I1QQYr1tU&usqp=CAU",
      price: 2.99,
    },
    {
      id: 5,
      name: "Adrian de los Reyes",
      image:
        "data:image/jpeg;base64,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",
      price: 2.99,
    },
    {
      id: 6,
      name: "Caro Pardiaco",
      image: "https://pbs.twimg.com/media/DEEFyJUXoAEuzRA.jpg",
      price: 2.99,
    },
  ];

  const renderSubscriptions = () => {
    if (subscriptions.length === 0) {
      return <p>No hay suscripciones disponibles.</p>;
    }

    return subscriptions.map((subscription) => (
      <CardSubscription key={subscription.id} subscription={subscription} />
    ));
  };

  return (
    <div className="container mx-auto my-8 sm:w-full">
      <h2 className="text-[20px] font-bold">
        {token ? "Suscripciones" : "Sugerencias"}
      </h2>
      <p className="subtitle">Algunos perfiles que podrían interesarte.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:w-full">
        {renderSubscriptions()}
      </div>
    </div>
  );
};

export default ContainerSubscriptions;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubscriptions } from "../../slices/subscriptionsSlice";
// import CardSubscription from "./CardSubscription";

// const ContainerSubscriptions = () => {
//     const dispatch = useDispatch();
//     const { subscriptions, status, error } = useSelector((state) => state.subscriptions);

//     useEffect(() => {
//         if (status === "idle") {
//             dispatch(fetchSubscriptions());
//         }
//     }, [status, dispatch]);

//     if (status === "loading") {
//         return <p>Cargando suscripciones...</p>;
//     }

//     if (status === "failed") {
//         return <p>Error al cargar suscripciones: {error}</p>;
//     }

//     return (
//         <div className="container my-8 sm:w-full">
//             <h2 className="text-2xl font-bold">Suscripciones</h2>
//             <p className="subtitle">Te dejamos algunos perfiles que podrían interesarte.</p>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:w-full">
//                 {subscriptions.map((subscription) => (
//                     <CardSubscription key={subscription.id} subscription={subscription} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ContainerSubscriptions;
