import axios from "axios";

async function getAccessToken(){
    return axios.get('http://localhost:3000/api/forge/oauth/token')
    // return axios.get('http://localhost:5000/auth/token')
    // return axios.get('https://test-render-app-twgy.onrender.com/auth/token')
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
        console.log(err);
    })
}


const Client = {getAccessToken}
export default Client;