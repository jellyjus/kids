import axios from 'axios'
const port = 8443;
const SERVER_URL = (process.env.NODE_ENV === 'development')? `http://localhost:${port}` : '';

const http = {
    install(Vue, options) {
        Vue.prototype.$http = {
            put(url, body) {
                return axios.put(SERVER_URL + url, body)
            }
        }
    }
};

export default http;