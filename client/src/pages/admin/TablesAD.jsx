
import {Card, CardContent, CardFooter} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import TableModal from "@/components/adminComponets/Tables/TableModal.jsx";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "react-query";
import CashierApi from "@/api/CashierApi.jsx";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useAdminContext} from "@/context/AdminContext.jsx";

function TablesAD() {
    const {setIsLoading} = useAdminContext()
    useEffect(() => {
        setIsLoading(true)
    }, []);
    const [configModal, setConfigModal] = useState(false)
    const {data:tables} = useQuery('AdminTables',CashierApi.getTables,{
        select:(data => data.data.tables),
        onError:(() => setIsLoading(false)),
        onSuccess:(() => setIsLoading(false)),
    })

    const closeModal = () => {
        setConfigModal(false)
        setIsLoading(false)
    }
    const queryClient = useQueryClient()
    const deleteTableCall = async (e) => {
        const isConfirmed = window.confirm('Are you sure to delete this table?');
        if (isConfirmed){
            setIsLoading(true)
            const id = e.currentTarget.dataset.table_id
            await AdminApi.deleteTable(id).then(({data}) => {
                if (data.success){
                    toast.success(data.message)
                    queryClient.invalidateQueries('AdminTables').then(() => setIsLoading(false))
                }
            })
        }
    }
    return (
        <div>
            <div className="flex justify-between items-center px-2 pb-5 text-2xl font-bold">
                <span>Tables: </span>
                <Button variant={"primary"} className={"text-white"}
                        onClick={() => setConfigModal(true)}>Config Tables</Button>
                {configModal && <TableModal closeModal={closeModal} />}

            </div>
            <div className="flex flex-col h-full w-full py-4">
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        <div className="grid grid-cols-4 gap-4 pb-3">
                            {tables?.map((table, key) => (
                                <Card key={key} className="flex flex-col justify-between h-full">
                                    <CardContent className="mt-4 font-bold">
                                        Table: {table.name}
                                    </CardContent>
                                    <CardFooter className="flex justify-center mb-3">
                                        <Button data-table_id={table.id} size={"sm"} variant={"danger"}
                                        onClick={deleteTableCall}>Supprimer</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablesAD;