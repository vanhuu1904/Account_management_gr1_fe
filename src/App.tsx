import { Outlet } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './styles/reset.scss'
import { useEffect } from "react";
import { fetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading/Loading";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import AdminPage from "./pages/admin/AdminPage";
import UserTable from "./pages/user/UserTable";
const Layout = () => {
  return (
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
export default function App() {
  const dispatch = useDispatch();

  const isLoading: boolean = useSelector((state: any) => state.account.isLoading)
  const getAccount = async () => {
    if (window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/') return;
    const res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
    console.log(">>>check res: ", res);
  }
  useEffect(() => {
    getAccount();
  }, []);
  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: 'user',
          element: <UserTable />
        }
      ]
    },
    {
      path: '/',
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
      ]
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
  ]);
  return (
    <>
      {isLoading === false || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '/' || window.location.pathname === 'admin' ?
        <RouterProvider router={router} />
        : <Loading />
      }

    </>
  )
}