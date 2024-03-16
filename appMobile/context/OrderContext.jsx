import {createContext, useContext, useState} from "react";
import func from "../helpers/func";

const StatOrderContext = createContext({
    increaseCartItem: () => {},
    removeItemFromCart: () => {},
    cartItems: [],
    setCartItems: () => {},
    getTotalPrice: () => {},
    insertDetailItem: () => {}
})

export default function OrderContext({children}){
    const [cartItems, setCartItems] = useState([])
    const { playSound } = func
    const increaseCartItem = (menu,detail="") => {
        playSound()
        setCartItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.menu.id === menu.id)
            if(!existingItem){
                return [...currentItems,{menu,detail,DPN: 1}]
            }else{
                return [...currentItems,{
                    menu,detail,DPN: existingItem.DPN !== undefined ? existingItem.DPN++ : 1
                }]
            }
        })
    }
    const removeItemFromCart = (menuId, DPN) => {
        playSound()
        setCartItems((currentItems) => {
            return currentItems.filter((item) => !(item.menu.id === menuId && item.DPN === DPN));
        });
    };
    const getTotalPrice = () => {
        let totalPrice = 0
        cartItems.forEach((item) => {
            totalPrice += item.menu.price
        })
        return totalPrice
    }
    const insertDetailItem = (menuId, DPN, detail) => {
        setCartItems((currentItems) => {
            const itemIndex = currentItems.findIndex((item) => item.menu.id === menuId && item.DPN === DPN);
            if (itemIndex !== -1) {
                const updatedItem = {
                    ...currentItems[itemIndex],
                    detail: detail
                };
                const updatedCartItems = [...currentItems];
                updatedCartItems[itemIndex] = updatedItem;
                return updatedCartItems;
            } else {
                return currentItems;
            }
        });
    };



    return (
        <StatOrderContext.Provider value={{
            increaseCartItem,cartItems,removeItemFromCart,setCartItems,getTotalPrice,insertDetailItem
        }}>
            {children}
        </StatOrderContext.Provider>
    )
}

export const useOrderContext = () => useContext(StatOrderContext)