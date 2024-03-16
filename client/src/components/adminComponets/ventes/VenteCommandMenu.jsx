

function VenteCommandMenu({command}) {
    return (
        <div >
            <span
                className="mb-2  text-lg font-semibold text-gray-900 dark:text-white">Command N°{command?.number} | Server: {command?.user?.name} | Table N°{command.table.name}</span>
            <span
                className="max-w-md space-y-1  text-gray-500 list-disc list-inside dark:text-gray-400">
                {command.menus.map((menu, key) => (
                    <li key={key} className={"ml-3"}>
                        <span
                            className={"font-bold capitalize"}>{menu?.title}: </span>{menu?.pivot?.choices}
                    </li>
                ))}
            </span>
            <span
                className="mb-5 text-l font-semibold text-gray-900 dark:text-white">Total: {command?.total}Dh</span>
            <br/>
            <span className="block bg-black h-px my-2 w-full"></span>
        </div>
    );
}

export default VenteCommandMenu;