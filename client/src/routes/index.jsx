import {Navigate, createBrowserRouter} from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout.jsx";
import Login from "../pages/Login.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import CashierLayout from "../layouts/CashierLayout.jsx";
import CashierHome from "../pages/cashier/CashierHome.jsx";
import Commands from "@/pages/cashier/Commands.jsx";
import Tables from "@/pages/cashier/Tables.jsx";
import Users from "@/pages/admin/Users.jsx";
import Menus from "@/pages/admin/Menus.jsx";
import TablesAD from "@/pages/admin/TablesAD.jsx";
import Ventes from "@/pages/admin/Ventes.jsx";

export const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "*",
                element: <Navigate to={"/login"} />
            }
        ]
    },
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminHome />
            },
            {
                path: "/admin/users",
                element: <Users />
            },
            {
                path: "/admin/menus",
                element: <Menus />
            },
            {
                path: "/admin/tables",
                element: <TablesAD />
            },
            {
                path: "/admin/ventes",
                element: <Ventes />
            },
            {
                path: "*",
                element: <Navigate to={"/login"} />
            }
        ]
    },
    {
        element: <CashierLayout />,
        children: [
            {
                path: "/cashier",
                element: <CashierHome />
            },
            {
                path: "/cashier/commands",
                element: <Commands />
            },
            {
                path: "/cashier/tables",
                element: <Tables />
            },
            {
                path: "*",
                element: <Navigate to={"/login"} />
            }

        ]
    }
])