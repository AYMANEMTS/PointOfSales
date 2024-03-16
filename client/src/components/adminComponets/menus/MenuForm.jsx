import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useAdminContext} from "@/context/AdminContext.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useQueryClient} from "react-query";
import {Loader} from "lucide-react";


function MenuForm({context,closeModal}) {
    const menuData = context.menuData  && context.menuData
    const {register,handleSubmit,setError,formState:{errors,isSubmitting}} = useForm({defaultValues:{
            title: menuData?menuData.title:null,
            price: menuData?menuData.price:null,
            image: menuData?menuData.image:null
        }})
    const [selectedImage, setSelectedImage] = useState(menuData?.image?`http://localhost:8000/storage/menu_images/${menuData.image}`:null);
    const queryClient = useQueryClient()
    const {setIsLoading} = useAdminContext()
    const setApiErrors = (errors) => {
        Object.keys(errors).forEach((field) => {
            setError(field, {
                type: 'manual',
                message: errors[field][0],
            })
        })
    }
    const submitMenu = async (data) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('title',data.title)
        formData.append('price',data.price)
        if (data.image && data.image.length > 0 && data.image[0] instanceof File) {
            formData.append('image', data.image[0]);
        }
        if (context.isUpdate){
            const id = context.menuData.id
            await AdminApi.updateMenu(id,formData).then(({data}) => {
                if (data.success){
                    toast.success(data.message)
                    closeModal()
                    queryClient.invalidateQueries('AdminMenus').then(() => setIsLoading(false))
                }else{
                    setApiErrors(data.errors)
                    setIsLoading(false)
                }
            })
        }else{
            await AdminApi.storeMenu(formData).then(({data}) => {
                if (data.success){
                    toast.success(data.message)
                    closeModal()
                    queryClient.invalidateQueries('AdminMenus').then(() => setIsLoading(false))
                }else{
                    setApiErrors(data.errors)
                    setIsLoading(false)
                }
            })
        }
    }
    const actionImage = () => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label className={"block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"}>
                        Title</Label>
                    <Input {...register('title')} type={"text"}/>
                    <p className={"text-red-600 text-xs font-bold italic"}>{errors.title && errors.title.message}</p>
                </div>
                <div className="md:w-1/2 px-3">
                    <Label className={"block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"}>
                        Price</Label>
                    <Input {...register('price')} type={"text"}/>
                    <p className={"text-red-600 text-xs font-bold italic mt-4"}>{errors.price && errors.price.message}</p>
                </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <Label className={"block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"}>
                        Image</Label>
                    <Input {...register('image')} onChange={actionImage} type={"file"}/>
                    <p className={"text-red-600 text-xs font-bold italic"}>{errors.image && errors.image.message}</p>
                </div>
                <div className="md:w-1/2 px-3">
                    <img className="object-scale-down h-48 w-96 " src={selectedImage} alt={"menu image"}/>
                </div>
            </div>
            <div
                className="flex items-center  justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <Button variant={"danger"} className={"m-1 "} onClick={closeModal}>
                    Close
                </Button>
                <Button disabled={isSubmitting} className={"bg-blue-700"} onClick={handleSubmit(submitMenu)}
                >{context.isUpdate?'Update':'Save'}
                    {isSubmitting && <Loader className={" mx-2 animate-spin text-white"} />}
                </Button>
            </div>

        </>
    );
}

export default MenuForm;