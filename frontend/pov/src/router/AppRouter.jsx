import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../index.css';
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
