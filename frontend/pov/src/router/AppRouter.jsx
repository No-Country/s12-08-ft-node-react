import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import '../index.css';
import SignUpForm from '../pages/SignUpForm';
 
const AppRouter = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reguister" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
