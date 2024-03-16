import {createContext, useContext, useEffect, useState} from "react";
import beepSound from "../assets/sound/beep-29.mp3"

const CashierCartItemsContext = createContext({
    menus: {},
    setMenus: () => {},
    tables: {},
    cartItems: {},
    setCartItems: () => {},
    setTables: () => {},
    increaseCartQty: () => {},
    removeItemFromCart: () => {},
    getCountItemsCart: () => {},
    getTotalPrice: () => {},
    commands: {},
    setCommands: () => {}

})
const INITIAL_CART_ITEMS = localStorage.getItem("shopping-cart")?JSON.parse(localStorage.getItem("shopping-cart")):[]
const ShopingCartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS)
    const [menus,setMenus] = useState([])
    const [tables, setTables] = useState([])
    const [commands, setCommands] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        localStorage.setItem("shopping-cart",JSON.stringify(cartItems))
    }, [cartItems]);
    const increaseCartQty = (id) => {
        const sound = new Audio()
        sound.src = beepSound
        sound.play()
        setCartItems((currentItems) => {
            const itemMenu = menus.find((menu) => menu.id === id);
            const existingItem = currentItems.find((item) => item.id === id);
            if (!existingItem) {
                return [...currentItems, { id, choices: "null", menu: itemMenu, DPN: 1 }];
            } else {
                return [
                    ...currentItems,
                    {
                        id,
                        choices: "null",
                        menu: itemMenu,
                        DPN: existingItem.DPN !== undefined ? existingItem.DPN++ : 1,
                    },
                ];
            }
        });
    };
    const removeItemFromCart = (id, DPN) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== id || item.DPN !== DPN)
        );
    };
    const getCountItemsCart = (Items) => {
        return Items.length
    }

    const getTotalPrice = () => {
        let total = 0
        cartItems.map((item) => {
            total += item.menu.price
        })
        return total
    };


    return <CashierCartItemsContext.Provider value={{cartItems,setCartItems,increaseCartQty,
        removeItemFromCart , getCountItemsCart , getTotalPrice , menus,setMenus,tables,setTables
    ,commands,setCommands,isLoading,setIsLoading}}>
        {children}
    </CashierCartItemsContext.Provider>
}
export default ShopingCartProvider;

export const useCashierContext = () => {
    return useContext(CashierCartItemsContext)
}