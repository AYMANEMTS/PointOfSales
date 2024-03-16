import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import UserDeleteDialog from "@/components/adminComponets/users/UserDeleteDialog.jsx";
import UserModal from "@/components/adminComponets/users/UserModal.jsx";

function UsersTable({users}) {
    const [confirmationDeleteUser, setConfirmationDeleteUser] = useState({
        modal:false,
        user_id:null
    })
    const [updateUserModal, setUpdateUserModal] = useState({
        modal: false,
        data: null
    })
    const deleteUser = (e) => {
        const id = e.currentTarget.dataset.user_id
        setConfirmationDeleteUser({
            user_id: id,
            modal: true
        })
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users?.map((user,key) => (
                                    <tr key={key} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium capitalize">{user.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{user.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4  font-medium">
                                            <Button size={"sm"} className={"m-1 bg-amber-500"}
                                            onClick={() => setUpdateUserModal({
                                                modal: true,
                                                data: user
                                            })}>
                                                Edit</Button>
                                            <Button size={"sm"} variant={"danger"} className={"m-1"}
                                            onClick={deleteUser} data-user_id={user.id}>
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
            {updateUserModal.modal && <UserModal userData={updateUserModal.data} isUpdate={true} setUpdateModal={setUpdateUserModal}/>}
            {confirmationDeleteUser.modal && <UserDeleteDialog setDialog={setConfirmationDeleteUser} user_id={confirmationDeleteUser.user_id} />}
        </>
    );
}

export default UsersTable;