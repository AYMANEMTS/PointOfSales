import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";
import {useAdminContext} from "@/context/AdminContext.jsx";
function ManualyForm({closeModal}) {
    const {register,handleSubmit,setError,
        formState:{errors,isSubmitting}} = useForm()
    const queryClient = useQueryClient()
    const {setIsLoading} = useAdminContext()

    const submitManualyForm = async (data) => {
        setIsLoading(true)
        await AdminApi.storeManualyTable(data).then(({data}) => {
            if (data.success){
                closeModal()
                toast.success(data.message)
                queryClient.invalidateQueries('AdminTables').then(()=>setIsLoading(false))
            }else {
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
            <Card>
                <CardHeader>
                    <CardTitle>Manual</CardTitle>
                    <CardDescription>
                        This action will enable you to create table with name of your choice (text or number).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input {...register('name')} id="name" />
                        <div className={"text-red-500 text-sm"}>{errors.name && errors.name.message}</div>
                    </div>
                </CardContent>
                <CardFooter className={"ml-6 mb-3"}>
                    <Button disabled={isSubmitting} onClick={handleSubmit(submitManualyForm)}> Save changes</Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default ManualyForm;