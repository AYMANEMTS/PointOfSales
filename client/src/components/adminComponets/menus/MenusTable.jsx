import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import MenuDeleteDialog from "@/components/adminComponets/menus/MenuDeleteDialog.jsx";

function MenusTable({setContext,menus,context}) {
    const [deleteDialog, setDeleteDialog] = useState(false)
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Image</th>
                                    <th scope="col" className="px-6 py-4">Title</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {menus?.map((menu,key) => (
                                    <tr key={key} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium capitalize">
                                            <img
                                                className="w-16 h-16 object-cover"
                                                src={`http://localhost:8000/storage/menu_images/${menu.image}`}
                                                alt={"product_image"}
                                            />

                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{menu.title}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{menu.price}DH</td>
                                        <td className="whitespace-nowrap px-6 py-4  font-medium">
                                            <Button onClick={() => setContext({
                                                modal: true,
                                                isUpdate: true,
                                                menuData: menu
                                            })}
                                                size={"sm"} className={"m-1 bg-amber-500"}>
                                                Edit</Button>
                                            <Button size={"sm"} variant={"danger"} className={"m-1"}
                                            onClick={() => {
                                                setDeleteDialog(true)
                                                setContext({menuData:menu})
                                            }}>
                                                Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {deleteDialog && <MenuDeleteDialog menuId={context.menuData.id} setDeleteDialog={setDeleteDialog}/>}
         </>
    );
}

export default MenusTable;