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
// Create axios client, pre-configured with baseURL
let API = axios.create({ baseURL });

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("token");
    console.log('my token : ' , token);
    if (!token) delete config.headers["Authorization"];
    else config.headers["Authorization"] = `Bearer ${token}`;
    // Do something before request is sent(this is for loader display)
    store.commit("setLoading", true);
    // store.state.isLoading = true;
    // console.log('function 1')
    return config;
  },
  function (error) {
    // Do something with request error
    store.commit("setLoading", false);
    // store.state.isLoading = false;
    // console.log('function 2')
    return Promise.reject(error);
  }
);

// Add a response interceptor

// Any status code that lie within the range of 2xx cause this function to trigger
// Do something with response data

API.interceptors.response.use(
  function (response) {
    store.commit("setLoading", false);
    // store.state.isLoading = false;
    // console.log('function 3')
    return response;
  },
  function (error) {
    store.commit("setLoading", false);
    // store.state.isLoading = false;
    // console.log('function 4')
    return Promise.reject(error);
  }
);

export default API;
