import {axiosClient} from "@/api/axios.js";
import toast from "react-hot-toast";

const CashierApi = {
    getMenus: async () => {
        return await axiosClient.get('/api/menus').catch(() => {
            toast.error("Failed to get products")
        })
    },
    getTables: async () => {
        return await axiosClient.get('/api/tables')
    },
    commandStore: async (data) => {
        return await axiosClient.post('/api/commands',data)
    },
    getCommands: async () => {
        return await axiosClient.get('/api/commands').catch(() => {
            toast.error("Failed to get commands")
        })
    },
    getTodayCommands: async () => {
        return await axiosClient.get('/api/command/today').catch(() => {
            toast.error("Failed to get Today commands")
        })
    },
    markAsPayedCommand: async (id) => {
        return await axiosClient.post(`/api/command/${id}/payed`).catch(() => {
            toast.error("Failed to mark As Payed Command")
        })
    },
    commandAddMenus: async (id,data) => {
        return await axiosClient.post(`/api/command/${id}/add_new_menus`,{ menu_choices: data }).catch(() => {
            toast.error("Failed to add New Menus to this Command")
        })
    }
}
export default CashierApi