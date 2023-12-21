import { LogoHistory } from "../components/Svg/Svgs";
import mrbeast from "../assets/reels/mrbeast/reel2.jpg";
import ibai from "../assets/reels/ibai/reel2.jpg";
import badbunny from "../assets/reels/badbunny/budbunny.avif";

export const users = [
  {
    id: 1,
    logo: <LogoHistory />,
    name: "MrBeast",
    profile_picture:
      "https://logos-world.net/wp-content/uploads/2021/09/Mr-Beast-Logo.png",
    reels: [
      {
        id: 1,
        gif: "https://images.squarespace-cdn.com/content/v1/560d66e0e4b02ef113036578/1664840389297-UZV5D4NEXCRDMPQ1Q0KY/220610-kirbygladstein-ultimatecrown-mrbeast-ninja-3Dgif-LOWRES-000018500014.gif",
        time: "15:30",
      },
      {
        id: 2,
        gif: mrbeast,
        time: "19:00",
      },
    ],
  },
  {
    id: 2,
    logo: <LogoHistory />,
    name: "Ibai",
    profile_picture:
      "https://pbs.twimg.com/profile_images/1540810647604183046/OhYhwdAi_400x400.jpg",
    reels: [
      {
        id: 1,
        gif: ibai,
        time: "08:15",
      },
    ],
  },
  {
    id: 3,
    logo: <LogoHistory />,
    name: "Messi",
    profile_picture:
      "https://pxccdn.ciudadano.news/ciudadano/092023/1693845688004/leo-messi-png..jpg",
    reels: [
      {
        id: 1,
        gif: "https://media0.giphy.com/media/Ve57R7NSD8LqCmCinO/giphy.gif",
        time: "16:32",
      },
    ],
  },
  {
    id: 4,
    logo: <LogoHistory />,
    name: "BadBunny",
    profile_picture:
      "https://www.billboard.com/wp-content/uploads/2023/01/Bad-Bunny-aug-2022-billboard-espanol-1548.jpg",
    reels: [
      {
        id: 1,
        gif: "https://media.tenor.com/9drVvVc7jyQAAAAC/bad-bunny-benito.gif ",
        time: "12:00",
      },
      {
        id: 2,
        gif: badbunny,
        time: "18:30",
      },
    ],
  },
];
