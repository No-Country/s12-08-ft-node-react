import { History } from '../components/Histories/History';
import ContainerSubscriptions from '../components/Subscription/ContainerSubscriptions';

export const Home = () => {
  return (
    <>
      <section className="flex flex-col pt-28 px-5">
        <History />
        <ContainerSubscriptions/>
      </section>
    </>
  );
};
