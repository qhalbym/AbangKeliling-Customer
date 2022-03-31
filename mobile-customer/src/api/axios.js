import axios from "axios";

// nanti kalo udah deploy diganti
// const baseUrl = "http://localhost:4000";

const baseUrl = "http://7ee9-2001-448a-2020-c9d5-9c4e-46f9-439e-6824.ngrok.io";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
