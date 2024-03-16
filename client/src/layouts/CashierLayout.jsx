import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import LeftSideBar from "@/components/POS/LeftSideBar.jsx";
import "../assets/dashboardCss/styles.css"
import CashierApi from "@/api/CashierApi.jsx";
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import {useQuery} from "react-query";
import Loading from "@/components/custtomComponets/Loading.jsx";
function CashierLayout() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {setMenus,setTables,setCommands,isLoading} = useCashierContext()
    const {data:menus,isLoading:menusLoading} = useQuery('menus',CashierApi.getMenus,{
        refetchOnWindowFocus:false,
        retry:1,
        cacheTime:100000,
        staleTime:100000,
        onSuccess:((data) => {
            setMenus(data.data)
        })

    })
    const {data:tables,isLoading:tablesLading} = useQuery('tables',CashierApi.getTables,{
        refetchOnWindowFocus:false,
        retry:1,
        cacheTime:100000,
        staleTime:100000,
        onSuccess:((data) => {
            setTables(data.data.tables || []);
        })
    })
    const {data:commands,isLoading:commandsLoading} = useQuery('AllCommands',CashierApi.getTodayCommands,{
        refetchOnWindowFocus:false,
        retry:1,
        cacheTime:100000,
        staleTime:100000,
        onSuccess:((data) => {
            setCommands(data.data.commands)
        })
    })
    useEffect(() => {
        if (!token){
            navigate("/login")
        }
    }, [token]);

    return (
        <>
            {/* noprint-area */}
            <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
                <LeftSideBar/>
                {menusLoading||tablesLading||commandsLoading||isLoading?<Loading />:''}
                <Outlet/>
            </div>
            {/* end noprint-area */}
            <div id="print-area" className="print-area"></div>
        </>
    );
}

export default CashierLayout;