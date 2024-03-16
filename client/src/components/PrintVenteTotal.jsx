import React, { forwardRef, useEffect, useState } from "react";
import { format } from "date-fns";
import { useUserContext } from "@/context/UserContext.jsx";
import AdminApi from "@/api/AdminApi.jsx";

const PrintVenteTotal = forwardRef(({ date }, ref) => {
    const { user } = useUserContext();
    const [total, setTotal] = useState(0);
    const [commands, setCommands] = useState([]);

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

    const commandsCount = commands?.length||0;
    const menusCount = commands.reduce((totalMenus, cmd) => totalMenus + cmd.menus.length, 0);

    return (
        <>
            <div ref={ref} id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Resturant AYMANE</h2>
                </div>
                <div className="flex mt-4 text-xs">
                    <div className="flex-grow text-xs font-semibold">Printed By <span>{user.name} </span></div>
                    <div className="flex-grow text-xs font-semibold">Ventes facture date : <span>{date} </span></div>
                </div>
                <hr className="my-2" />
                <div>
                    <table className="w-full text-xs">
                        <thead>
                        <tr>
                            <th className="py-1 text-left">Total Commands</th>
                            <th className="py-1 w-6/12 text-center">Total Menus</th>
                            <th className="py-1 w-3/12 text-right">Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-2 text-left capitalize">{commandsCount}</td>
                            <td className="py-2 text-center">{menusCount}</td>
                            <td className="py-2 text-right">{total}DH</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="my-2" />
                <div>Date de print: {format(new Date(), 'd/MM/yyyy')}</div>
            </div>
        </>
    );
});

export default PrintVenteTotal;
