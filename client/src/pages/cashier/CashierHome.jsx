import StoreMenu from "@/components/POS/StoreMenu.jsx";
import RightSideBar from "@/components/POS/RightSideBar.jsx";
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import EmptyMenus from "@/components/POS/EmptyMenus.jsx";

function CashierHome() {
    const { menus } = useCashierContext()
    return (
        <>
            <div className="flex-grow flex">
                <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                    <div className="flex px-2 flex-row relative">
                        <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        <input type="text"
                               className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                               placeholder="Cari menu ..."/>
                    </div>
                    {menus.length > 0 ? <StoreMenu/> : <EmptyMenus />}

                </div>
                <RightSideBar/>
            </div>
        </>
    );
}

export default CashierHome;