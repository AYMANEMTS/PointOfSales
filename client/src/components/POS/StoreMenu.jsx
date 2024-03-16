import testImage from "../../assets/images.jpg"
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
function StoreMenu() {

    const { increaseCartQty , menus } = useCashierContext()

    return (
        <>
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        <div className="grid grid-cols-4 gap-4 pb-3">
                            {menus?.map((menu,key) => (
                                <div key={key} role="button"
                                     onClick={() => increaseCartQty(menu.id)}
                                     className="select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg">
                                    <img
                                        className="object-cover h-40 w-full flex-shrink-0"
                                        src={`http://localhost:8000/storage/menu_images/${menu.image}`}
                                        alt={menu.title}
                                    />
                                    <div className="flex pb-3 px-3 text-sm mt-3">
                                        <p className="flex-grow truncate mr-1 capitalize">{menu.title}</p>
                                        <p className="nowrap font-semibold">{menu.price} DH</p>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    }

export default StoreMenu;