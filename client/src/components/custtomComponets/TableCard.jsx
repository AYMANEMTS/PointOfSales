import {Card, CardContent} from "@/components/ui/card.jsx";
import { buttonVariants } from "@/components/ui/button"
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
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import {useState} from "react";
import TableCommands from "@/components/custtomComponets/TableCommands.jsx";

function TableComponent({table}) {
    const {commands} = useCashierContext()
    const [tableCommands, setTableCommands] = useState([])
    const getTableCommands = () => {
        if (Array.isArray(commands)) {
            const filteredCommands = commands.filter((command) => command.table.id === table.id);
            setTableCommands(filteredCommands);
            return filteredCommands;
        }
        setTableCommands([]);
        return [];
        
    };
    return (
        <Card>
            <CardContent className={"pt-3"}>
                Table N°{table.name}
                    <Dialog>
                        <DialogTrigger  onClick={getTableCommands}
                                       className={buttonVariants({variant:"primary",className:"mt-4 w-full text-white"})} >
                            Show Commands</DialogTrigger>
                        <DialogContent>
                            <DialogClose className={"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 data-[state=open]:text-gray-500 dark:ring-offset-gray-950 dark:focus:ring-gray-300 dark:data-[state=open]:bg-gray-800 dark:data-[state=open]:text-gray-400"}>
                                <X className="h-4 w-4" />
                            </DialogClose>
                            <DialogHeader>
                                <DialogTitle>This is today commands for table {table.name}</DialogTitle>
                                <DialogDescription>
                                    {tableCommands.map((command,key) => (
                                        <TableCommands key={key} command={command}/>
                                    ))}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
            </CardContent>
        </Card>
    );
}

export default TableComponent;