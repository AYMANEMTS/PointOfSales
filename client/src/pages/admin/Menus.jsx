import {Button} from "@/components/ui/button.jsx";
import MenusTable from "@/components/adminComponets/menus/MenusTable.jsx";
import MenuModal from "@/components/adminComponets/menus/MenuModal.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import CashierApi from "@/api/CashierApi.jsx";
import toast from "react-hot-toast";
import {useAdminContext} from "@/context/AdminContext.jsx";

function Menus() {
    const [context, setContext] = useState({
        modal: false,
        menuData: {},
        isUpdate: false
    })
    const {setIsLoading} = useAdminContext()
    useEffect(() => {
        setIsLoading(true)
    }, []);
    const {data: {data}=[]} = useQuery('AdminMenus',CashierApi.getMenus,{
        onError:(() => setIsLoading(false)),
        onSuccess:(() => setIsLoading(false)),
    })
    return (
        <>
            <div>
                <div className="flex justify-between items-center px-2 pb-5 text-2xl font-bold">
                    <span>Menus: </span>
                    <Button className={"text-white bg-blue-700"}
                    onClick={() => setContext({modal: true})}>
                        Créer
                    </Button>
                </div>
                <MenusTable menus={data}  context={context} setContext={setContext}/>
                {context.modal && <MenuModal context={context} setContext={setContext}/>}
            </div>
        </>
    );
}

export default Menus;