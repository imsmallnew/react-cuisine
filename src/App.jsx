import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'; // 引入自定義樣式

import routes from './routes/index.jsx';
import store from "./redux/store.js";

const router = createHashRouter(routes, {
  future: {
    v7_startTransition: true, // 避免 React Router 7 的 startTransition 警告
    v7_relativeSplatPath: true // 避免 Splat routes 警告
  }
});

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;