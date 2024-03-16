import {useForm} from "react-hook-form";
import UserForm from "@/components/adminComponets/users/UserForm.jsx";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";
import {useAdminContext} from "@/context/AdminContext.jsx";
import {Loader} from "lucide-react";

function UserModal({setUserModal,isUpdate,userData,setUpdateModal}) {
    const {register,handleSubmit,setError,formState:{errors,isSubmitting,isDirty}} = useForm({
        defaultValues:{
            name:isUpdate?userData.name:null,
            email:isUpdate?userData.email:null,
            password:null,
            role:isUpdate?userData.role:null
        }
    })
    const {setIsLoading,isLoading} = useAdminContext()
    const setApiErrors = (errors) => {
        Object.keys(errors).forEach((field) => {
            setError(field, {
                type: 'manual',
                message: errors[field][0],
            })
        })
    }
    const queryClient = useQueryClient()
    const submitUser = async (data) => {
        setIsLoading(true)
        if (isUpdate){
            const id = userData.id
            await AdminApi.updateUser(id,data).then(({data}) => {
                if (data.success){
                    queryClient.invalidateQueries('users')
                    toast.success(data.message)
                    setUpdateModal({})
                    setIsLoading(false)
                }else{
                    setApiErrors(data.errors)
                }
            })
        }else{
            await AdminApi.AddUser(data).then(({data}) => {
                if (data.success){
                    queryClient.invalidateQueries('users')
                    toast.success(data.message)
                    setUserModal(false)
                    setIsLoading(false)
                }else{
                    setApiErrors(data.errors)
                }
            })
        }
    }
    const closeModal = () => {
        if (isUpdate){
            setUpdateModal({})
        }else{
            setUserModal(false)
        }
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {isUpdate?'Update User: '+userData.name:'Ajouter un nouvel utilisateur'}
                            </h3>
                            <button className="p-1 ml-8 bg-transparent  border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeModal}>
                                        <span className="bg-white text-gray-950  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                          ×
                                        </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className=" p-6 flex-auto">
                            <UserForm register={register} errors={errors} isUpdate={isUpdate} setUpdateModal={setUpdateModal} updateUserId={userData?.id}/>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button onClick={closeModal}
                                className="text-red-500 hover:bg-red-400 hover:text-white rounded background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button">
                                Close
                            </button>
                            <button disabled={!isDirty||isSubmitting} type="button" onClick={handleSubmit(submitUser)}
                                    className={`bg-blue-700 hover:bg-blue-950 ${isLoading && 'bg-blue-400'} text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>
                                {isLoading && <Loader className={" mx-2 animate-spin text-white"} />}
                                {isUpdate?'Update':'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default UserModal;