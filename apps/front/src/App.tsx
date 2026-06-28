import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

function App() {
  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
