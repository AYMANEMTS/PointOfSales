import UsersTable from "@/components/adminComponets/users/UsersTable.jsx";
import {Button} from "@/components/ui/button.jsx";
import UserModal from "@/components/adminComponets/users/UserModal.jsx";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import AdminApi from "@/api/AdminApi.jsx";
import toast from "react-hot-toast";
import {useAdminContext} from "@/context/AdminContext.jsx";
function Users() {
    useEffect(() => {
        setIsLoading(true)
    }, []);
    const [userModal, setUserModal] = useState(false)
    const {setIsLoading} = useAdminContext()
    const {data: {data}={}} = useQuery('users',AdminApi.getUsers,{
        onError:(err) => {
            toast.error('Failed to get users')
            setIsLoading(false)
        },
        onSuccess:() => setIsLoading(false),
        retry:1,
    })
    return (
        <div>
            <div className="flex justify-between items-center px-2 pb-5 text-2xl font-bold">
                <span>Utilisateurs: </span>
                <Button className={"text-white bg-blue-700"} onClick={() => setUserModal(true)}>
                    Créer
                </Button>
            </div>
            <UsersTable users={data}/>
            {userModal && <UserModal setUserModal={setUserModal} isUpdate={false}/>}
        </div>
    );
}

export default Users;