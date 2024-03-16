import {Link, useLocation} from "react-router-dom";
import AuthApi from "@/api/AuthApi.jsx";
function SideBar() {
    const {pathname} = useLocation()
    return (
        <>
            <aside
                className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a href="#">
                    <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt=""/>
                </a>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-6 ">
                        <div className="space-y-3 ">
                            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">analytics</label>

                            <Link to={"/admin"}
                                  className={`flex items-center px-3 py-2 text-gray-600 ${pathname === '/admin' && 'bg-gray-200'} transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 512 512" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1"
                                        d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
                                </svg>
                                <span className="mx-2 text-sm font-medium">Dashboard</span>
                            </Link>

                            <Link to={"/admin/ventes"}
                                  className={`flex items-center px-3 py-2 text-gray-600 ${pathname === '/admin/ventes' && 'bg-gray-200'} transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 384 512" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1" d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"/>
                                </svg>

                                <span className="mx-2 text-sm font-medium">Les ventes</span>
                            </Link>
                        </div>

                        <div className="space-y-3 ">
                            <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">gérer</label>

                            <Link to={"/admin/users"}
                                  className={`flex items-center px-3 py-2 text-gray-600 ${pathname === '/admin/users' && 'bg-gray-200'} transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1"
                                        d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/>
                                </svg>

                                <span className="mx-2 text-sm font-medium">Utilisateurs</span>
                            </Link>

                            <Link to={"/admin/menus"}
                                  className={`flex items-center px-3 py-2 text-gray-600 ${pathname==='/admin/menus'&&'bg-gray-200'} transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1" d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"/>
                                </svg>

                                <span className="mx-2 text-sm font-medium">Menus</span>
                            </Link>

                            <Link to={"/admin/tables"}
                                  className={`flex items-center px-3 py-2 text-gray-600 ${pathname==='/admin/tables'&&'bg-gray-200'} transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1" d="M64 256V160H224v96H64zm0 64H224v96H64V320zm224 96V320H448v96H288zM448 256H288V160H448v96zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"/>
                                </svg>
                                <span className="mx-2 text-sm font-medium">Tables</span>
                            </Link>
                        </div>

                        <div className="space-y-3 ">
                            <label
                                className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

                            <Link to={"/cashier"}
                                className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path fill="#6366f1"
                                        d="M64 0C46.3 0 32 14.3 32 32V96c0 17.7 14.3 32 32 32h80v32H87c-31.6 0-58.5 23.1-63.3 54.4L1.1 364.1C.4 368.8 0 373.6 0 378.4V448c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V378.4c0-4.8-.4-9.6-1.1-14.4L488.2 214.4C483.5 183.1 456.6 160 425 160H208V128h80c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H64zM96 48H256c8.8 0 16 7.2 16 16s-7.2 16-16 16H96c-8.8 0-16-7.2-16-16s7.2-16 16-16zM64 432c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm48-168a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm120-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM160 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM328 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM256 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM424 240a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM352 344a24 24 0 1 1 0-48 24 24 0 1 1 0 48z"/>
                                </svg>

                                <span className="mx-2 text-sm font-medium">Mode Cashier</span>
                            </Link>

                            <button className="flex items-center w-full px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                               onClick={AuthApi.logout} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"
                                     viewBox="0 0 512 512">
                                    <path fill="#6366f1" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                                </svg>

                                <span className="mx-2 text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>

            </aside>

        </>
    );
}

export default SideBar;