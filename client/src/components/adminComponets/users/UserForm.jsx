import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useAdminContext} from "@/context/AdminContext.jsx";

function UserForm({register,errors,isUpdate,updateUserId,setUpdateModal}) {
    const {register:registerChangePass,handleSubmit,setError,formState:{errors:changePassErrors}} = useForm()
    const [changePasswordForm, setChangePasswordForm] = useState(false)
    const {isLoading,setIsLoading} = useAdminContext()
    const submitChangePass = async (data) => {
        setIsLoading(true)
        const id = updateUserId
        await AdminApi.changePassUser(id,data).then(({data}) => {
            if (data.success){
                setUpdateModal({})
                setIsLoading(false)
                toast.success(data.message)
            }else{
                Object.keys(data.errors).forEach((field) => {
                    setError(field, {
                        type: 'manual',
                        message: data.errors[field][0],
                    })
                })
            }
        })
    }
    return (
        <>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Name
                    </label>
                    <input {...register('name')}
                           className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-${errors.name ? 'red-600' : 'grey-lighter'} rounded py-3 px-4 mb-3`}
                           id="name" type="text" placeholder="full name"/>
                    <p className={"text-red-600 text-xs font-bold italic"}>{errors.name && errors.name.message}</p>
                </div>
                <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Email
                    </label>
                    <input
                        className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-${errors.email ? 'red-600' : 'grey-lighter'} rounded py-3 px-4 mb-3`}
                        id="email" type="email" placeholder="email@example.ma" {...register('email')}/>
                    <p className={"text-red-600 text-xs font-bold italic mt-4"}>{errors.email && errors.email.message}</p>

                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        {isUpdate ? 'Update Password' : 'Password'}
                    </label>
                    {isUpdate ? (
                        <button onClick={() => setChangePasswordForm(!changePasswordForm)}
                            className={`appearance-none block bg-gray-800 w-full bg-grey-lighter text-white border border-grey-lighter rounded py-3 px-4 mb-3`}
                        >Change Password</button>
                    ) : (
                        <>
                            <input {...register('password')}
                                   className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-${errors.password ? 'red-600' : 'grey-lighter'} rounded py-3 px-4 mb-3`}
                                   id="password" type="password" placeholder="password"/>
                            <p className={"text-red-600 text-xs font-bold italic"}> {errors.password && errors.password.message}</p>
                        </>
                    )}

                </div>
                <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                        Role
                    </label>
                    <div className="relative">
                        <select defaultValue={""} {...register('role')}
                                className={`block appearance-none w-full bg-gray-200 border border-${errors.role ? 'red-600' : 'gray-200'} text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                id="role">
                            <option value={""}>select role</option>
                            <option value={"admin"}>Admin</option>
                            <option value={"cashier"}>Cashier</option>
                            <option value={"serveur"}>Serveur</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </div>
                        <p className={"text-red-600 text-xs font-bold italic mt-4"}>{errors.role && errors.role.message}</p>
                    </div>
                </div>
            </div>
            {/*  Change Password  */}
            {changePasswordForm && (
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Current Password
                        </label>
                        <input {...registerChangePass('currentPass')}
                            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-${changePassErrors.currentPass ? 'red-600' : 'grey-lighter'} rounded py-3 px-4 mb-3`}
                            id="currentPass" type="password" placeholder="current password"/>
                        <p className={"text-red-600 text-xs font-bold italic"}>{changePassErrors.currentPass && changePassErrors.currentPass.message}</p>
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            New Password
                        </label>
                        <input {...registerChangePass('newPass')}
                            className={`appearance-none block w-full bg-grey-lighter text-grey-darker border border-${changePassErrors.newPass ? 'red-600' : 'grey-lighter'} rounded py-3 px-4 mb-3`}
                            id="newPass" type="password" placeholder="new password"/>
                        <p className={"text-red-600 text-xs font-bold italic mt-4"}>{changePassErrors.newPass && changePassErrors.newPass.message}</p>
                    </div>
                    <Button onClick={handleSubmit(submitChangePass)} className={`mt-7 bg-blue-700 ${isLoading && 'bg-blue-400'}`} size={"lg"}>Save</Button>
                </div>
            )}
        </>
    );
}

export default UserForm;