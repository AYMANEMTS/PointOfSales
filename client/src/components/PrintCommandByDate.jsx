
import React, {useEffect, useState} from 'react';
import AdminApi from "@/api/AdminApi.jsx";
import {useUserContext} from "@/context/UserContext.jsx";
import {format} from "date-fns";

const PrintCommandByDate = React.forwardRef(({date}, ref) => {
    useEffect(() => {
        const getCommandsByDate = async () => {
            try {
                const response = await AdminApi.getCommandsByDate(date);
                setTotal(response.data.total);
                setCommands(response.data.commands);
            } catch (error) {
                console.error('Error fetching commands by date:', error);
            }
        };
        getCommandsByDate();
    }, [date]);
    const [total, setTotal] = useState(0)
    const [commands, setCommands] = useState()
    const {user} = useUserContext()
    return (
        <>
            <div ref={ref} id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Resturant AYMANE</h2>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow text-xs font-semibold">Printed By  <span>{user.name} </span></div>
                    <div className="flex-grow text-xs font-semibold">Ventes facture date :  <span>{date} </span></div>
                </div>
                <hr className="my-2"/>
                <div>
                    <table className="w-full text-xs">
                        <thead>
                        <tr>
                            <th className="py-1 text-left">Command N°</th>
                            <th className="py-1 w-6/12 text-center">Table N°</th>
                            <th className="py-1 w-3/12 text-right">Server</th>
                            <th className="py-1 w-3/12 text-right">SubTotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {commands?.map((cmd,key) => (
                            <tr key={key}>
                                <td className="py-2 text-left capitalize">{cmd.number}</td>
                                <td className="py-2 text-center">{cmd.table.name}</td>
                                <td className="py-2 text-right">{cmd.user.name}</td>
                                <td className="py-2 text-right">{cmd.total}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <hr className="my-2"/>
                <div>
                    <div className="flex font-semibold">
                        <div className="flex-grow">TOTAL</div>
                        <div>{total}DH</div>
                    </div>
                </div>
                <hr className="my-2"/>
                <div>Date de print: {format(new Date(), 'd/MM/yyyy')}</div>

            </div>
        </>
    );
});

export default PrintCommandByDate;
