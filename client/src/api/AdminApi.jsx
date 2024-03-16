import {axiosClient} from "@/api/axios.js";
import toast from "react-hot-toast";
const AdminApi = {
    AddUser: async (data) => {
        return await axiosClient.post("/api/add-user",data)
            .catch(() => toast.error("failed to add user "))
    },
    getUsers: async () => {
        return await axiosClient.get('/api/users')
            .catch(() => toast.error("failed to get users"))
    },
    deleteUser: async (id) => {
        return await axiosClient.delete(`/api/users/${id}/destroy`)
            .catch(() => toast.error("failed to delete user"))
    },
    updateUser: async (id,data) => {
        return await axiosClient.post(`/api/users/${id}/update`,data)
            .catch(() => toast.error("failed to update user"))
    },
    changePassUser: async (id,data) => {
        return await axiosClient.post(`/api/users/${id}/changePassword`,data)
            .catch(() => toast.error("failed to change password"))
    },
    storeMenu: async (data) => {
        return await axiosClient.post('/api/menus',data)
            .catch(() => toast.error("failed to create menu "))
    },
    updateMenu: async (id,data) => {
        return await axiosClient.post(`/api/menus/update/${id}`,data)
            .catch(() => toast.error("failed to update menu "))
    },
    deleteMenu: async (id) => {
        return await axiosClient.delete(`/api/menus/${id}`)
            .catch(() => toast.error("failed to delete menu "))
    },
    storeManualyTable: async (data) => {
        return await axiosClient.post('api/tables',data)
            .catch(() => toast.error("failed to create manualy table"))
    },
    storeAutoTable: async (data) => {
        return await axiosClient.post('/api/tables/config',data)
            .catch(() => toast.error("failed to create automatic table"))
    },
    deleteTable: async (id) => {
        return await axiosClient.delete(`/api/tables/${id}`)
            .catch(() => toast.error("failed to delete this table "))
    },
    getRosetsCommands: async () => {
        return axiosClient.get('api/rosets/commands')
            .catch(() => toast.error("failed to get les ventes"))
    },
    getCommandsByDate: async (date) => {
        return axiosClient.get('/api/get_commands_by_date', { params: { date } })
            .catch(() => toast.error("failed to get commands by date"))
    }
}
export default AdminApi