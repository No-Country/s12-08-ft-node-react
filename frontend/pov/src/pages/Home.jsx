import ContainerSubscriptions from "../components/Subscription/ContainerSubscriptions";
import { History } from "../components/Histories/History";
import NavBar from "../components/NavBar/NavBar";

export const Home = () => {
  return (
    <>
      <section className="flex flex-col pt-28 px-5">
        <NavBar />
        <History />
        <ContainerSubscriptions />
      </section>
    </>
  );
};
