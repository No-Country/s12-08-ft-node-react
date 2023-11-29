import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import  ContainerSubscriptions  from '../components/Subscription/ContainerSubscriptions';
import '../index.css';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/containerSubscriptions" element={<ContainerSubscriptions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
