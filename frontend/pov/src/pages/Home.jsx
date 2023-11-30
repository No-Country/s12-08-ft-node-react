import ContainerSubscriptions from "../components/Subscription/ContainerSubscriptions";
import { History } from "../components/Histories/History";

export const Home = () => {
  return (
    <>
      <section className="flex flex-col pt-28 px-5">
        <History />
        <ContainerSubscriptions />
      </section>
    </>
  );
};
