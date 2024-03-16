import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card.jsx";
import {Button, buttonVariants} from "@/components/ui/button.jsx";
import {useRef, useState} from "react";
import VenteCommandMenu from "@/components/adminComponets/ventes/VenteCommandMenu.jsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {X} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TreePointPNG from "../../../assets/3point.png"
import {ReactToPrint} from "react-to-print";
import PrintCommandByDate from "@/components/PrintCommandByDate.jsx";
import PrintVenteTotal from "@/components/PrintVenteTotal.jsx";
function VenteCard({vente}) {
    const [modalState, setModalState] = useState(false)
    const closeModal = () => setModalState(false)
    const printComponetRef = useRef()
    const printWithTotalRef = useRef()
    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>{vente?.date}</div>
                        <div className="relative">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src={TreePointPNG} alt={"..."} className={"h-4 w-4"}/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Print Action</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <ReactToPrint
                                            trigger={() => (
                                                <button>
                                                    Print with commands
                                                </button>
                                            )}
                                            content={() => printComponetRef.current}
                                            documentTitle={`facture_commands_${vente.date}`}
                                        />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ReactToPrint
                                            trigger={() => (
                                                <button>
                                                    Print with only total
                                                </button>
                                            )}
                                            content={() => printWithTotalRef.current}
                                            documentTitle={`facture_commands_total_${vente.date}`}
                                        />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Save as exel</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className={""}>
                    <div className={"flex flex-col w-full"}>
                        <div className={"w-full flex justify-between"}>
                            <span>Total Commands:</span>
                            <span>{vente?.commands?.length}</span>
                        </div>
                        <div className={"w-full flex justify-between"}>
                            <span>Total Prix:</span>
                            <span>{vente?.total}DH</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                    <Dialog>
                        <DialogTrigger
                            className={buttonVariants({variant: "primary", className: "text-white mb-3"})}>
                            Show Commands</DialogTrigger>
                        <DialogContent>
                            <DialogClose
                                className={"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-400"}>
                                <X className="h-4 w-4"/>
                            </DialogClose>
                            <DialogHeader>
                                <DialogTitle>This is commands for day {vente?.date} </DialogTitle>
                                <DialogDescription>
                                    {vente?.commands?.map((command, key) => (
                                        <VenteCommandMenu command={command} key={key}/>
                                    ))}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
            <div style={{display: "none"}}>
                <PrintCommandByDate ref={printComponetRef} date={vente.date}/>
            </div>
            <div style={{display: "none"}}>
                <PrintVenteTotal ref={printWithTotalRef} date={vente.date}/>
            </div>

        </>

    );
}

export default VenteCard;