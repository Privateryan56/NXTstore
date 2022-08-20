import axios from "axios";

const apiClient= axios.create({
    baseURL:"http://nxtstore-server.heroku.com/",
})
export default apiClient;