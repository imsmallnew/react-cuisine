import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '../components/Loading';

const FrontLayout = lazy(() => import('../layouts/FrontLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const Home = lazy(() => import('../pages/Home'));
const ProductsList = lazy(() => import('../pages/ProductsList'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const Cart = lazy(() => import('../pages/Cart'));
const Form = lazy(() => import('../pages/Form'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AdminHome = lazy(() => import('../pages/admin/AdminHome'));

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <FrontLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <ProductsList /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'form', element: <Form /> },
    ].map(route => ({ ...route, element: <Suspense fallback={<Loading />}>{route.element}</Suspense> }))
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: 'products', element: <Navigate to="/admin/products/1" replace /> },
      { path: 'products/:page', element: <AdminProducts /> },
      { path: 'orders', element: <Navigate to="/admin/orders/1" replace /> },
      { path: 'orders/:page', element: <AdminOrders /> },
    ].map(route => ({ ...route, element: <Suspense fallback={<Loading />}>{route.element}</Suspense> }))
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    )
  },
];

export default routes;