import DataUtil from './utils/DataUtil.js';

export default class API {
    static sendRequest(url, method = 'get', data = null, options = {}) {
        const allowedMethods = ['get', 'post', 'put', 'delete'];
        method = method.toLowerCase();
        if(allowedMethods.includes(method)){
            return window.$nuxt.$axios[method](url, data)
                .then((response) => {
                    if(options.onlyData === true){
                        return response.data;
                    }else{
                        return response;
                    }
                })
                .catch(async (error) => {
                    if(error.response.status === 419) {
                        await API.refreshCSRFToken();
                        return API.sendRequest(url, method, data, options);
                    }else if(error.response.status === 401 && !DataUtil.isEmpty(window.mainLayout)) {
                        if(options.doNotRelogin !== true){
                            window.mainLayout.relogin();
                        }else{
                            throw error;
                        }
                    }else{
                        throw error;
                    }
                });
        }else{
            console.error("Invalid method: " + method);
        }

    }
    static async refreshCSRFToken() {
        window.$nuxt.$axios.defaults.headers.common['X-CSRF-TOKEN'] = (await window.$nuxt.$axios.get("/api/csrf")).data;
    }
    static async getReferenceSelect(table){
        let result = [];
        await API.sendRequest(`/api/select/${table}`).then(response => {
            result = response.data;
        });
        return result;
    }
}