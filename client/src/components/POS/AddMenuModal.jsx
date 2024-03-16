import FormAddMenuModal from "@/components/POS/FormAddMenuModal.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import CashierApi from "@/api/CashierApi.jsx";
import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";

function AddMenuModal({showModal,setShowModal,cmd}) {
    const [countForm, setCountForm] = useState(1)
    const [data, setData] = useState([])
    const {setIsLoading} = useCashierContext()
    const closeModal = () => {
        setCountForm(1)
        setShowModal(false)

    }
    const queryClient = useQueryClient()
    const addMenusMutation = useMutation((vars) => CashierApi.commandAddMenus(vars.id, vars.data),{
        onSuccess:((res) => {
            if (res.data.success) {
                queryClient.invalidateQueries('AllCommands')
                toast.success(res.data.message)
                setIsLoading(false)
                setData([])
            }else{
                toast.success(res.data.message)
                setIsLoading(false)
                setData([])
            }
        }),
        onError:((err) => {
            setIsLoading(false)
            setData([])
            console.log(err)
        }),

    })
    const addMenusFunc = async (id) => {
        closeModal()
        const variables = {id,data}
        addMenusMutation.mutate(variables)
        setIsLoading(true)
    };

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Menus to Command N° {cmd.number}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}>
                                        <span className="bg-white text-gray-950   h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className=" p-6 flex-auto">
                                    <Button onClick={() => setCountForm(countForm+1)}
                                        className={"ml-2 w-[29rem] bg-emerald-500 "}>+</Button>
                                    {Array.from({length:countForm},(_,index) => (
                                        <FormAddMenuModal data={data} setData={setData}
                                            key={index}
                                            index={index}
                                            />
                                    ))}
                                </div>
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button type="button" onClick={()=>addMenusFunc(cmd.id)}
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

export default AddMenuModal;