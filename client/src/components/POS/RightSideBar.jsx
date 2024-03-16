import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import { useState} from "react";
import ModalReceipt from "@/components/POS/ModalReceipt.jsx";
import CartItems from "@/components/POS/CartItems.jsx";
import EmptyCart from "@/components/POS/EmptyCart.jsx";
import {useUserContext} from "@/context/UserContext.jsx";
function RightSideBar(){
    const {cartItems} = useCashierContext()
    const [selectTable, setSelectTable] = useState(null)
    const {getTotalPrice} = useCashierContext()

    const [commandModal, setCommandModal] = useState(false)

    return (
        <>
        <div className="w-5/12 flex flex-col bg-blue-gray-50 h-full  pr-4 pl-2 py-4">
            <div className="bg-white rounded-3xl flex flex-col h-full shadow">
                {cartItems.length > 0 ? <CartItems setSelectTable={setSelectTable} /> : <EmptyCart /> }
                <div className="select-none h-auto w-full text-center pt-3 pb-4 px-4">
                    <div className="flex mb-3 text-lg font-semibold text-blue-gray-700">
                        <div>TOTAL</div>
                        <div className="text-right w-full">{getTotalPrice()} DH</div>
                    </div>
                    <button disabled={selectTable === null} onClick={() => setCommandModal(true)}
                        className={`text-white hover:bg-blue-gray-400 ${selectTable!==null?'bg-blue-gray-600':'bg-blue-gray-400'} rounded-2xl text-lg w-full py-3 focus:outline-none`}>
                        SUBMIT
                    </button>
                </div>
            </div>

        </div>
            {commandModal && <ModalReceipt table={selectTable} setCommandModal={setCommandModal}/>}
        </>
    );
}

export default RightSideBar;