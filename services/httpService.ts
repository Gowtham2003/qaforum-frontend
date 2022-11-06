// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";

// define the api
const api = create({
  baseURL: process.env.REACT_APP_API_URL+"/api/",
});

export default api;
