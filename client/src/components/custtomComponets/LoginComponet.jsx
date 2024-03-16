import {useUserContext} from "@/context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Loader} from "lucide-react";
import {useState} from "react";
function LoginComponet() {
    const { login } = useUserContext()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {register,handleSubmit,
        setError,formState:{errors}} = useForm()
    const {setUser} = useUserContext()
    const submitLogin = async (data) => {
        setIsSubmitting(true)
        login(data.email, data.password)
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem('userData', JSON.stringify(res.data.user));
                    setUser(res.data.user)
                    localStorage.setItem('token', res.data.token);
                    console.log(res.data.user.role)
                    navigate(`/${res.data.user.role}`)
                }else{
                    setError('email', {type:"manual",message:"The provided credentials are incorrect"})
                }
            })
            .catch((err) => {
                console.log(err)
                setError('email', { type: 'manual', message: 'An error occurred' });
                setError('password', { type: 'manual', message: 'An error occurred' });
            })
            .finally(() => {
            setIsSubmitting(false)
        })
    };

    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit(submitLogin)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register('email', {
                                    required: {
                                        value: true,
                                        message: "this field is required"
                                    }
                                })}
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-md px-3 border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && <span className={"text-red-500"}>{errors.email.message}</span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                {...register('password',{
                                    required:{
                                        value:true,
                                        message:"this field is required"
                                    }
                                })}
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-md px-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && <span className={"text-red-500"}>{errors.password.message}</span>}
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit" disabled={isSubmitting}
                            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isSubmitting && 'bg-indigo-500'} hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                        >
                            {isSubmitting ?
                                <>
                                    <Loader className={" mx-2 animate-spin text-white"} /> loading
                                </>
                                : "Sign in"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default LoginComponet;