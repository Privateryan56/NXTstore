import axios from "axios";

const apiClient= axios.create({
    baseURL:"http://nxtstore-server.herokuapp.com/",
})
export default apiClient;