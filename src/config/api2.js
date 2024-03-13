// with out loader 
// 

// const baseURL = "http://3.22.113.231/law-backend/api";
// const baseURL = "https://admin.makinglawsimple.com.au/api";
const baseURL ="http://127.0.0.1:8000/api"
// const baseURL = "https://virtualrealitycreators.com/law-backend/api"; 


// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://virtualrealitycreators.com/law-backend/api"
//     : "http://127.0.0.1:8000/api";


import axios from "axios";
import store from "../store";
let API = axios.create({ baseURL });

API.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("token");
    if (!token) delete config.headers["Authorization"];
    else config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    store.commit("setLoading", false);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default API;
