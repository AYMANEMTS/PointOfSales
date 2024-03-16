import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import { formatDistanceToNow , format } from 'date-fns';
import {useRef, useState} from "react";
import CashierApi from "@/api/CashierApi.jsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import AddMenuModal from "@/components/POS/AddMenuModal.jsx";
import {useMutation, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {ReactToPrint} from "react-to-print";
import PrintCommand from "@/components/PrintCommand.jsx";

function CommandCard({cmd}) {
    const { setIsLoading } = useCashierContext()
    const formattedTime = (time,status) => {
        if(status === 'hour'){
            return format(time, 'HH:mm a');
        }
        return formatDistanceToNow(new Date(time), { addSuffix: true })
    }
    const queryClient = useQueryClient()

    const markAsPayedMutation = useMutation((id) => CashierApi.markAsPayedCommand(id),{
        onSuccess:((res) => {
            if (res.data.success) {
                queryClient.invalidateQueries('AllCommands').then(() => setIsLoading(false))
                toast.success(res.data.message)
                setIsLoading(false)
            }
        })
    })
    const printCommandRef = useRef()
    const [showModal, setShowModal] = useState(false)
    return (
        <Card >
            <CardHeader>
                <CardTitle>
                    Command N°{cmd.number}

                </CardTitle>
                <CardDescription>
                    Table: {cmd.table.name} | status: <span className={"capitalize mx-1 "}>{cmd.payed?'payed':'notPayed'}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className=" text-base text-neutral-600 dark:text-neutral-200">
                    {cmd.menus.map((menu, key) => (
                        <li className={"flex items-center"} key={key}>
                            <span className={"capitalize text-1xl font-bold justify-self-start "}>{menu.title}: </span>
                            <span className={"ml-4"}> {menu.pivot.choices}</span>
                        </li>
                    ))}
                    <li className={"flex items-center"} >
                        <span className={"capitalize text-1xl font-bold justify-self-start "}>Total: </span>
                        <span className={"ml-4"}> {cmd.total} DH</span>
                    </li>
                </div>
            </CardContent>
            <CardFooter>
                <div className={"ml-5"}>
                    {!cmd.payed ? (
                        <>
                            <Button onClick={() => setShowModal(true)}
                                    className={"m-1 text-white "} variant={"primary"}>
                                +
                            </Button>
                            <Button onClick={() => {
                                setIsLoading(true)
                                markAsPayedMutation.mutate(cmd.id)
                            }}
                                    className={"m-1"} variant={"success"}>
                                ✔
                            </Button>
                        </>
                    ):(
                        <>
                            <ReactToPrint
                                trigger={() => <Button
                                    variant={"primary"} className={"m-1 w-full"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"
                                             viewBox="0 0 510 510">
                                            <path
                                                d="M24 32C10.7 32 0 42.7 0 56V456c0 13.3 10.7 24 24 24H40c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H24zm88 0c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H184zm96 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H280zM448 56V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H472c-13.3 0-24 10.7-24 24zm-64-8V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16s-16 7.2-16 16z"/>
                                        </svg>
                                </Button>}
                                content={() => printCommandRef.current}
                                documentTitle={`facture_command_N°${cmd?.number}`}
                            />
                            <div style={{display: "none"}}>
                                <PrintCommand ref={printCommandRef} command={cmd} />
                            </div>
                        </>

                    )}
                </div>
            </CardFooter>
            <div className="mb-2 ml-6 ">
                <Label> {formattedTime(cmd.created_at)} | {formattedTime(cmd.created_at, 'hour')}</Label>
            </div>
            <AddMenuModal showModal={showModal} setShowModal={setShowModal} cmd={cmd}/>
        </Card>
    )



}

export default CommandCard;