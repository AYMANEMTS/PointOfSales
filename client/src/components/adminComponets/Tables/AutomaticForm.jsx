import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";
import {useAdminContext} from "@/context/AdminContext.jsx";

function AutomaticForm({closeModal}) {
    const {register,handleSubmit,setError,
        formState:{errors,isSubmitting}} = useForm()
    const queryClient = useQueryClient()
    const {setIsLoading} = useAdminContext()
    const submitAutomaticForm = async (data) => {
        setIsLoading(true)
        data.numberOfTables = parseInt(data.numberOfTables)
        await AdminApi.storeAutoTable(data).then(({data}) => {
            if (data.success){
                closeModal()
                toast.success(data.message)
                queryClient.invalidateQueries('AdminTables').then(() => setIsLoading(false))
            }else {
                setError('numberOfTables',{
                    type: 'manual',
                    message: data.message
                })
            }
        })
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Automatic </CardTitle>
                    <CardDescription>
                        This action will be delete all tables and create from 1 to your number
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="number">Number</Label>
                        <Input {...register('numberOfTables')} type={"number"} id="number"/>
                        <div className={"text-red-500 text-sm"}>{errors.numberOfTables && errors.numberOfTables.message}</div>
                    </div>
                </CardContent>
                <CardFooter className={"ml-6 mb-3"}>
                    <Button disabled={isSubmitting} onClick={handleSubmit(submitAutomaticForm)} >Save changes</Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default AutomaticForm;