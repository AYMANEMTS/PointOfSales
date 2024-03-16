import {useUserContext} from "@/context/UserContext.jsx";
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import CashierApi from "@/api/CashierApi.jsx";
import toast from "react-hot-toast";
import {useMutation, useQueryClient} from "react-query";
import {useEffect, useState} from "react";

function ModalReceipt({table,setCommandModal}) {
    const { getTotalPrice , cartItems,setCartItems , setIsLoading } = useCashierContext()
    const {user} = useUserContext()
    const commandData = {
        user_id: user.id,
        table_id: table,
        total: getTotalPrice(),
        menu_choices: []
    }
    cartItems.forEach((item) => {
        commandData.menu_choices.push({
            menu_id: item.id,
            choices: item.choices
        })
    })
    const queryClient = useQueryClient()
    const proceedCommandMutation = useMutation((commandData) => CashierApi.commandStore(commandData),{
        onSuccess:((res) => {
            if (res.data.success === true){
                setCartItems([])
                setCommandModal(false)
                toast.success(res.data.message)
                setIsLoading(false)
                queryClient.invalidateQueries('AllCommands')
            }
        }),
        onError:((error) => {
            toast.error("Failed to create this command")
            console.error(error)
            setIsLoading(false)
        } )
    })
    const proceedCommand = async () => {
        setCommandModal(false)
        setIsLoading(true)
        proceedCommandMutation.mutate(commandData)
    }
    return (
        <>
            <div className="fixed w-full h-screen left-0 top-0 z-10 flex flex-wrap justify-center content-center p-24">
                <div className="fixed glass w-full h-screen left-0 top-0 z-0"></div>
                <div className="w-96 rounded-3xl bg-white shadow-xl overflow-hidden z-10">
                    <div id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                        <button className="bg-gray-400 w-8 h-8 rounded-full text-white hover:bg-gray-900"
                        onClick={() => setCommandModal(false)}>
                            X
                        </button>

                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Resturant AYMANE</h2>
                        </div>
                        <div className="flex mt-4 text-xs">
                            <div className="flex-grow text-xs font-semibold">Table: <span>{table}</span></div>
                            <div></div>
                        </div>
                        <hr className="my-2"/>
                        <div>
                            <table className="w-full text-xs">
                                <thead>
                                <tr>
                                    <th className="py-1 text-left">Item</th>
                                    <th className="py-1 w-6/12 text-center">Detail</th>
                                    <th className="py-1 w-3/12 text-right">Subtotal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item,key) => (
                                    <tr key={key}>
                                        <td className="py-2 text-left capitalize">{item.menu.title}</td>
                                        <td className="py-2 text-center">{item.choices}</td>
                                        <td className="py-2 text-right">{item.menu.price} DH</td>
                                    </tr>
                                ))}


                                </tbody>
                            </table>
                        </div>
                        <hr className="my-2"/>
                        <div>
                            <div className="flex font-semibold">
                            <div className="flex-grow">TOTAL</div>
                                <div>{getTotalPrice()} DH</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 w-full">
                        <button onClick={proceedCommand} className="bg-cyan-500 hover:bg-cyan-700 text-white text-lg px-4 py-3 rounded-2xl w-full focus:outline-none"  >PROCEED</button>
                </div>
            </div>
            </div>
        </>
    );
}

export default ModalReceipt;