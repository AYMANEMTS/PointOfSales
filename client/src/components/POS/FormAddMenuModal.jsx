import {useCashierContext} from "@/context/CashierCartItemsContext.jsx";

function FormAddMenuModal({ setData , index}) {
    const { menus } = useCashierContext();


    return (
        <form>
            <select onChange={(e) => {
                setData((prevData) => {
                    prevData[index] = { ...prevData[index], menu_id: e.target.value };
                    return [...prevData];  // Make sure to return a new array
                });
            }}
                name={`menu_id`}
                className="border-2 rounded border-black m-2"
            >
                <option value={null}>select menu</option>
                {menus.map((menu, menuKey) => (
                    <option value={menu.id} key={menuKey}>
                        {menu.title}
                    </option>
                ))}
            </select>
            <input defaultValue={"choices"} onChange={(e) => {
                setData((prevData) => {
                    prevData[index] = { ...prevData[index], choices: e.target.value };
                    return [...prevData];
                });
            }}
                name={`details`}
                className="border-2 rounded border-black text-black px-2 m-2"
                placeholder="details"
                type="text"
            />
        </form>
    );
}


export default FormAddMenuModal;