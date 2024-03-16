import {Outlet, useNavigate} from "react-router-dom";
import {useUserContext} from "../context/UserContext.jsx";
import {useEffect} from "react";
import SideBar from "@/components/adminComponets/SideBar.jsx";
import Loading from "@/components/custtomComponets/Loading.jsx";
import {useAdminContext} from "@/context/AdminContext.jsx";
function AdminLayout() {
    const { user} = useUserContext()
    const {isLoading} = useAdminContext()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        if (user && user.role === "cashier"){
            navigate("/cashier")
        }
    }, [user, token, navigate])

    return (
        <div className="flex h-screen">
            <SideBar />
            {isLoading && <Loading />}
            <div className="flex-1 p-10">
                <Outlet/>
            </div>
        </div>
    );
}

export default AdminLayout;