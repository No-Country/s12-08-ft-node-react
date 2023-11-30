import { History } from '../components/History';
import NavBar from "../components/NavBar/NavBar";
import ContainerSubscriptions from '../components/Subscription/ContainerSubscriptions';




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
