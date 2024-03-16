import {axiosClient} from "./axios";

const ServerApi = {
    login: async (data) => {
        return await axiosClient.post('/api/login',data)
    },
    getMenus: async () => {
        return await axiosClient.get('/api/menus')
    },
    getTables: async () => {
        return await axiosClient.get('/api/tables')
    },
    storeOrder: async (data) => {
        return await axiosClient.post('/api/commands',data)
    },
    getTodayCommands: async () => {
        return await axiosClient.get('/api/command/today')
    },
    markAsPayed: async (id) => {
        return await axiosClient.post(`/api/command/${id}/payed`)
    },
    addMenusToOrder: async (id,formData) => {
        return await axiosClient.post(`/api/command/${id}/add_new_menus`, {menu_choices:formData})
    },
    updateUser: async (id,data) => {
        return await axiosClient.post(`/api/users/${id}/update`,data)
    },
    changePassword: async (id,data) => {
        return await axiosClient.post(`/api/users/${id}/changePassword`,data)
    }
}
export default ServerApi