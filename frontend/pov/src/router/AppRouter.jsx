import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../index.css';
const AppRouter = () => {
  const Example = 'Doing things width'
  console.log(Example)

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
