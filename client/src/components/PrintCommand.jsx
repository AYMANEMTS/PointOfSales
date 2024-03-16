import {forwardRef} from "react";
import {format} from "date-fns"

const PrintCommand = forwardRef(({command} , ref) => {
    const formatTime = (time) => {
        if (!time) {
            return '';
        }
        const dateObject = new Date(time);
        return  format(dateObject, 'yyyy/MM/dd hh:mm a')
    }
    return (
        <div ref={ref} id="receipt-content" className="text-left w-full text-sm p-6 overflow-auto">
            <div className="text-center">
                <h2 className="text-xl font-semibold">Resturant AYMANE</h2>
            </div>
            <div className="flex mt-4 text-xs">
                <div className="flex-grow text-xs font-semibold">Command N°<span>{command?.number}</span></div>
                <div className="flex-grow text-xs font-semibold">Server: <span>{command?.user?.name}</span></div>
                <div className="flex-grow text-xs font-semibold">Table N°<span>{command?.table?.name}</span></div>

            </div>
            <hr className="my-2"/>
            <div>
                <table className="w-full text-xs">
                    <thead>
                    <tr>
                        <th className="py-1 text-left">Menu</th>
                        <th className="py-1 w-6/12 text-center">Detail</th>
                        <th className="py-1 w-3/12 text-right">Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {command?.menus?.map((menu,key) => (
                        <tr key={key}>
                            <td className="py-2 text-left capitalize">{menu.title}</td>
                            <td className="py-2 text-center">{menu.pivot?.choices}</td>
                            <td className="py-2 text-right">{menu.price} DH</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <hr className="my-2"/>
            <div>
                <div className="flex font-semibold">
                    <div className="flex-grow">TOTAL</div>
                    <div>{command?.total} DH</div>
                </div>
            </div>
            <hr className="my-2"/>
            <div>Date: {formatTime(command?.created_at)}</div>
        </div>

    )
})

export default PrintCommand;