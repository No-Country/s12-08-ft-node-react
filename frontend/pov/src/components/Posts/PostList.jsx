import Post from "./Post";

// const userPosts = [
//   {
//     id: "1",
//     username: "Rubius",
//     email: "rubius@mail.com",
//     name: "Ruben Bladez",
//     role: "client",
//     profile_picture: userAvatar,
//     date_of_birdth: "1999-12-02",
//     subscriptions: [
//       {
//         beneficiary_id: "1",
//       },
//       {
//         beneficiary_id: "2",
//       },
//       {
//         beneficiary_id: "3",
//       },
//       {
//         beneficiary_id: "4",
//       },
//       {
//         beneficiary_id: "5",
//       },
//       {
//         beneficiary_id: "6",
//       },
//       {
//         beneficiary_id: "7",
//       },
//       {
//         beneficiary_id: "8",
//       },
//     ],
//     subscribersCount: 1780340,
//     subscribedToCount: 8,
//     posts: [
//       {
//         id: "1",
//         imageAdded: "",
//         message: "Hola soy un post sin imagen. Probando esta nueva APP!",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Y entonces?...",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message: "mmm...no creo que sea asi.",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Tal vez puede que vaya tambien..pero me da fiaca!.",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 0,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 10,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 0,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 30,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 0,
//           },
//         ],
//       },
//       {
//         id: "2",
//         imageAdded:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4z46qK0RcIPyHJ8np0rnC5j6DCFGW7M9yGgQ8X5cMPOn-tnzy7SSu9ruItPItNDd5KY&usqp=CAU",
//         message: "Cómo estan? que les parece esta nueva portada para mi serie?",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Esta Genial!!!!",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message: "Yo buscaria una foto mejor...",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Me la voy a ver en un día! les aseguro!",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 30,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 0,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 5,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 10,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 1,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "2",
//     username: "NoCountry",
//     email: "nocountry@mail.com",
//     name: "No Country",
//     role: "client",
//     profile_picture: userAvatar,
//     date_of_birdth: "2010-01-10",
//     subscriptions: [
//       {
//         beneficiary_id: "1",
//       },
//       {
//         beneficiary_id: "2",
//       },
//       {
//         beneficiary_id: "3",
//       },
//       {
//         beneficiary_id: "4",
//       },
//       {
//         beneficiary_id: "5",
//       },
//     ],
//     subscribersCount: 20345,
//     subscribedToCount: 5,
//     posts: [
//       {
//         id: "1",
//         imageAdded: "",
//         message:
//           "Hola Bienvenidos a NoCountry. A la gente que hizo POV le vamos a poner un 10!! o no?",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Donde me puedo anotar???",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message: "Quisiera que me pasen mas info. Gracias!",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Claro que siiii!!",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 15,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 10,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 1,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 0,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 0,
//           },
//         ],
//       },
//       {
//         id: "2",
//         imageAdded:
//           "https://media.licdn.com/dms/image/D4E22AQFv1R0SQj1mYw/feedshare-shrink_2048_1536/0/1699454762857?e=1704931200&v=beta&t=nzXQfiwhBF4OGrUn4XYokrv5akuFjsB3YsEQI9JQrtA",
//         message:
//           "Cómo estan? les dejamos info para anotarse a la nueva simulación para el 2024",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Esta Genial!!!!",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message: "Excelente ya me estoy anotando!",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Tiene algun costo???",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 30,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 0,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 5,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 10,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 1,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "3",
//     username: "midudev",
//     email: "nocountry@mail.com",
//     name: "MIDUdev",
//     role: "client",
//     profile_picture: userAvatar,
//     date_of_birdth: "2008-05-14",
//     subscriptions: [
//       {
//         beneficiary_id: "1",
//       },
//       {
//         beneficiary_id: "2",
//       },
//       {
//         beneficiary_id: "3",
//       },
//       {
//         beneficiary_id: "4",
//       },
//       {
//         beneficiary_id: "5",
//       },
//       {
//         beneficiary_id: "6",
//       },
//       {
//         beneficiary_id: "7",
//       },
//       {
//         beneficiary_id: "8",
//       },
//       {
//         beneficiary_id: "9",
//       },
//       {
//         beneficiary_id: "10",
//       },
//       {
//         beneficiary_id: "11",
//       },
//     ],
//     subscribersCount: 80908,
//     subscribedToCount: 11,
//     posts: [
//       {
//         id: "1",
//         imageAdded:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP7ZExgP83PmU9IcKyN5NYm8zfirXVveCLYtDr3Z9eckWqHwHaBk5rRrU_a19bgXlJle8&usqp=CAU",
//         message: "Hola acabo de abrir este chat en POV que os parece??",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Ya te empece a seguir",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message:
//               "Le aviso a mis amigos que creen una cuenta asi te siguen!",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Claro que siiii!!",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 15,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 10,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 1,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 0,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 0,
//           },
//         ],
//       },
//       {
//         id: "2",
//         imageAdded:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDonKzchqLXRd-VeOWWDw66V7J8meysvtdj48wnyblbxcSSVit2ICph2hXngCqOjnadoI&usqp=CAU",
//         message:
//           "Cómo estan? pueden seguirme en Twitch para ver clases en vivo y codear juntos!!",
//         responses: [
//           {
//             id: "1",
//             username: "Usuario1",
//             avatar: noUserAvatar,
//             message: "Esta Genial!!!!",
//           },
//           {
//             id: "2",
//             username: "Usuario2",
//             avatar: noUserAvatar,
//             message: "Excelente ya me estoy anotando!",
//           },
//           {
//             id: "3",
//             username: "Usuario3",
//             avatar: noUserAvatar,
//             message: "Tiene algun costo???",
//           },
//         ],
//         reactions: [
//           {
//             id: "1",
//             image: "😍",
//             amount: 100,
//           },
//           {
//             id: "2",
//             image: "🔥",
//             amount: 15,
//           },
//           {
//             id: "3",
//             image: "💀",
//             amount: 5,
//           },
//           {
//             id: "4",
//             image: "🤮",
//             amount: 8,
//           },
//           {
//             id: "5",
//             image: "👿",
//             amount: 0,
//           },
//           {
//             id: "6",
//             image: "✖️",
//             amount: 1,
//           },
//         ],
//       },
//     ],
//   },
// ];

// POSTLIST toma los posts que es un array de objetos post y los lista.-
const PostList = ({ posts, userName, userAvatar }) => {
  return (
    <section className="py-4 flex flex-col gap-4 px-[16px]">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          userName={userName}
          userAvatar={userAvatar}
        />
      ))}
    </section>
  );
};

export default PostList;
