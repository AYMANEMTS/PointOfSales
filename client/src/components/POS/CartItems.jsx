import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import testImage from "@/assets/images.jpg";
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import buttonSound from "../../assets/sound/button-21.mp3"
function CartItems({setSelectTable}) {
    const { tables , cartItems , setCartItems , removeItemFromCart , getCountItemsCart } = useCashierContext()

    return (
        <>
            <div   className="flex-1 flex flex-col overflow-auto">
                <div className="h-16 text-center flex justify-center">
                    {/* cart icon */}
                    <div className="pl-8 text-left text-lg py-4 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div   className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3"  >{getCountItemsCart(cartItems)}</div>
                    </div>
                    <div className={"pl-20 py-5 relative"}>
                        <Select onValueChange={(value) => {
                            setSelectTable(value)
                        }} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue  placeholder="Table :" />
                            </SelectTrigger>
                            <SelectContent >
                                {tables.map((table,key) => (
                                    <SelectItem key={key} value={table.id} >Table: {table.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="flex-grow px-8 text-right text-lg py-4 relative">
                        {/* trash button */}
                        <button onClick={() => {
                            const sound = new Audio()
                            sound.src = buttonSound
                            sound.play()
                            setCartItems([])
                        }}
                                className="text-blue-gray-300 hover:text-pink-500 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full px-4 overflow-auto">
                    {cartItems?.map((cartItem,key) => (
                        <div key={key}
                             className="select-none mb-3 bg-blue-gray-50 rounded-lg w-full text-blue-gray-700 py-2 px-2 flex justify-center">
                            <img src={`http://localhost:8000/storage/menu_images/${cartItem.menu.image}`} alt="" className="rounded-lg h-10 w-10 bg-white shadow mr-2"/>
                            <div className="flex-grow">
                                <h5 className="text-sm capitalize">{cartItem?.menu?.title}</h5>
                                <p className="text-xs block">{cartItem?.menu?.price} DH</p>
                            </div>
                            <div className="py-1">
                                <div className="grid grid-cols-6 gap-2 ml-2">
                                    <input type="text" placeholder={"details : "}
                                           onChange={(e) => {
                                               setCartItems((currentItems) => {
                                                   return currentItems.map((item) => {
                                                       if (item.id === cartItem?.id && item.DPN === cartItem.DPN){
                                                           return {...item,choices:e.target.value}
                                                       }
                                                       return item
                                                   })
                                               })
                                           }}
                                           className="col-span-5 w-full p-2 border border-gray-300 rounded-md"/>
                                    <button onClick={() => removeItemFromCart(cartItem.id,cartItem.DPN)}
                                            className="col-span-1 rounded-lg text-center py-1
                                            text-white bg-red-500 hover:bg-red-950 focus:outline-none">
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default CartItems;