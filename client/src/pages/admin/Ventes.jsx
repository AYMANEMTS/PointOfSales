import {useQuery} from "react-query";
import AdminApi from "@/api/AdminApi.jsx";
import VenteCard from "@/components/adminComponets/ventes/VenteCard.jsx";
import {useAdminContext} from "@/context/AdminContext.jsx";
import {useEffect} from "react";

function Ventes() {
    const {setIsLoading} = useAdminContext()
    useEffect(() => {
        setIsLoading(true)
    }, []);
    const {data: {data}=[]} = useQuery('ventes',AdminApi.getRosetsCommands,{
        onSuccess:(() => setIsLoading(false)),
        onError:(() => setIsLoading(false)),
    })
    return (
        <div>
            <div className="flex justify-between items-center px-2 pb-5 text-2xl font-bold">
                <span>Ventes & Rosets: </span>
            </div>
            <div className="flex flex-col h-full w-full py-4">
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        <div className="grid grid-cols-4 gap-4 pb-3">
                            {data?.map((vente,key) => (
                                <VenteCard key={key} vente={vente} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ventes;