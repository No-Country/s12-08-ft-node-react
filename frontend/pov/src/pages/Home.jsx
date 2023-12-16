import NavBar from "../components/NavBar/NavBar";
import ContainerSubscriptions from "../components/Subscription/ContainerSubscriptions";
import { History } from "../components/Histories/History";

export const Home = () => {
  return (
    <>
      <NavBar />
      <main className="w-full md:max-w-[1000px] min-h-screen lg:mx-auto flex flex-col pt-28 px-5">
        <History />
        <ContainerSubscriptions />
      </main>
    </>
  );
};
