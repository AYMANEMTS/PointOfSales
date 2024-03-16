import CommandCard from "@/components/POS/CommandCard.jsx";
import { format} from 'date-fns'
import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useRef} from "react";
import {ReactToPrint} from "react-to-print";
import PrintCommandByDate from "@/components/PrintCommandByDate.jsx";

function Commands() {
    const todayDate = format(new Date(), 'd/M/yyyy')
    const {commands} = useCashierContext()
    const printComponetRef = useRef()
    return (
        <>
            <div className="flex-grow flex">
                <div className="flex flex-col bg-blue-gray-50 h-full w-full pr-4 py-4">
                    <div className="flex px-2 flex-row relative">
                        <div className="absolute left-5 top-3 px-2 py-2 rounded-full bg-cyan-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                        <input type="text"
                               className="bg-white rounded-3xl shadow text-lg full w-full h-16 py-4 pl-16 transition-shadow focus:shadow-2xl focus:outline-none"
                               placeholder="Cari menu ..."/>
                    </div>
                    <div className="text-2xl pl-10">
                        <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                            <div className="h-full overflow-hidden mt-4">
                                <div className="flex justify-between items-center px-2 pb-5 text-2xl font-bold">
                                    <span>Today Commands: {todayDate}</span>
                                    {printComponetRef.current && (
                                        <ReactToPrint
                                            trigger={() => (
                                                <Button variant={"primary"} className={"text-white"}>
                                                    Print Total Today
                                                </Button>
                                            )}
                                            content={() => printComponetRef.current}
                                            documentTitle={`facture_commands_${todayDate}`}
                                        />
                                    )}
                                    <div style={{display:"none"}}>
                                        <PrintCommandByDate ref={printComponetRef} date={todayDate}/>
                                    </div>
                                </div>
                                <div className="h-full overflow-y-auto px-2">
                                    <div className="grid grid-cols-4 gap-4 pb-3">
                                        {Array.isArray(commands) && commands.map((cmd, key) => (
                                            <CommandCard key={key} cmd={cmd}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>

        </>
    );
}

export default Commands;